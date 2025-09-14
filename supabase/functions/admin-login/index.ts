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

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get admin user
    const { data: adminUser, error } = await supabaseClient
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('active', true)
      .single()

    if (error || !adminUser) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let isPasswordValid = false

    // Check bcrypt hash first
    if (adminUser.bcrypt_password_hash) {
      isPasswordValid = await bcrypt.compare(password, adminUser.bcrypt_password_hash)
    } 
    // Fallback to MD5 hash for migration (temporary)
    else if (adminUser.password_hash) {
      const crypto = new TextEncoder()
      const data = crypto.encode(password)
      const hashBuffer = await crypto.subtle.digest('MD5', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      isPasswordValid = hashHex === adminUser.password_hash
      
      // If MD5 login successful, migrate to bcrypt
      if (isPasswordValid) {
        const bcryptHash = await bcrypt.hash(password, 10)
        await supabaseClient
          .from('admin_users')
          .update({ bcrypt_password_hash: bcryptHash })
          .eq('id', adminUser.id)
      }
    }

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate session token (simple implementation)
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

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
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})