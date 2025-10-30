import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()
    
    // Get client IP address for rate limiting
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown'

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`[ADMIN LOGIN] Attempt from ${ipAddress} for ${email}`)

    // Check rate limiting
    const { data: rateLimitResult } = await supabaseClient
      .rpc('check_login_rate_limit', { 
        check_email: email,
        check_ip: ipAddress
      })

    if (rateLimitResult && rateLimitResult[0]?.is_limited) {
      const lockoutUntil = rateLimitResult[0].lockout_until
      console.log(`[ADMIN LOGIN] Rate limited: ${email} until ${lockoutUntil}`)
      
      await supabaseClient.rpc('log_login_attempt', {
        attempt_email: email,
        attempt_ip: ipAddress,
        was_successful: false
      })

      return new Response(
        JSON.stringify({ 
          error: 'Muitas tentativas de login. Tente novamente mais tarde.',
          lockout_until: lockoutUntil
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get admin user
    const { data: adminUser, error } = await supabaseClient
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('active', true)
      .single()

    if (error || !adminUser) {
      console.log(`[ADMIN LOGIN] Failed: User not found or inactive - ${email}`)
      
      await supabaseClient.rpc('log_login_attempt', {
        attempt_email: email,
        attempt_ip: ipAddress,
        was_successful: false
      })

      return new Response(
        JSON.stringify({ error: 'Credenciais inválidas' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Only accept bcrypt passwords (NO MD5 support anymore)
    let isPasswordValid = false
    
    if (adminUser.bcrypt_password_hash) {
      isPasswordValid = await bcrypt.compare(password, adminUser.bcrypt_password_hash)
    }

    if (!isPasswordValid) {
      console.log(`[ADMIN LOGIN] Failed: Invalid password - ${email}`)
      
      await supabaseClient.rpc('log_login_attempt', {
        attempt_email: email,
        attempt_ip: ipAddress,
        was_successful: false
      })

      return new Response(
        JSON.stringify({ error: 'Credenciais inválidas' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate secure session token
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    const userAgent = req.headers.get('user-agent') || 'unknown'

    // Store session in database
    const { error: sessionError } = await supabaseClient
      .from('admin_sessions')
      .insert({
        admin_user_id: adminUser.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent
      })

    if (sessionError) {
      console.error('[ADMIN LOGIN] Failed to create session:', sessionError)
      return new Response(
        JSON.stringify({ error: 'Erro ao criar sessão' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log successful login
    await supabaseClient.rpc('log_login_attempt', {
      attempt_email: email,
      attempt_ip: ipAddress,
      was_successful: true
    })

    console.log(`[ADMIN LOGIN] Success: ${email} - Session: ${sessionToken}`)

    return new Response(
      JSON.stringify({ 
        success: true,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name
        },
        session: {
          token: sessionToken,
          expiresAt: expiresAt.toISOString()
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('[ADMIN LOGIN] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})