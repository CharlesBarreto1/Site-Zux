import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';


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

      // Validate password using simple comparison
      const isValidPassword = password === adminData.password_hash;

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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
            alt="Zux Internet" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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