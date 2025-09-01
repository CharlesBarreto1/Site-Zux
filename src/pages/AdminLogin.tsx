import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';


const AdminLogin = () => {
  console.log('=== AdminLogin component loaded ===');
  console.log('Supabase import check:', typeof supabase);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('=== ADMIN LOGIN DEBUG ===');
    console.log('Tentando login com:', { email, password });
    console.log('Supabase client:', supabase);

    try {
      console.log('Fazendo query no Supabase...');
      
      // Check admin credentials
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('active', true)
        .maybeSingle();

      console.log('Resultado da busca:', { adminData, error });
      console.log('Tipo do error:', typeof error);
      console.log('Tipo do adminData:', typeof adminData);

      if (error || !adminData) {
        toast({
          title: "Erro de Login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        return;
      }

      // Validate password using bcrypt or fallback to plain text for migration
      let isValidPassword = false;
      
      // First try bcrypt hashed password if available
      if (adminData.bcrypt_password_hash) {
        isValidPassword = await bcrypt.compare(password, adminData.bcrypt_password_hash);
      } 
      // Fallback to plain text comparison for existing passwords (will be hashed by trigger)
      else if (adminData.password_hash) {
        isValidPassword = password === adminData.password_hash;
        
        // If plain text password matches, update it to bcrypt hash
        if (isValidPassword) {
          const { error: updateError } = await supabase
            .from('admin_users')
            .update({ password_hash: password }) // Trigger will hash this
            .eq('id', adminData.id);
            
          if (updateError) {
            console.error('Failed to upgrade password security:', updateError);
          }
        }
      }

      if (!isValidPassword) {
        toast({
          title: "Erro de Login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        return;
      }

      // Store admin session
      localStorage.setItem('admin_user', JSON.stringify({
        id: adminData.id,
        email: adminData.email,
        name: adminData.name
      }));

      toast({
        title: "Login realizado",
        description: "Bem-vindo ao painel administrativo",
      });

      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro",
        description: "Erro interno do servidor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
            alt="Zux Internet" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl text-white">Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;