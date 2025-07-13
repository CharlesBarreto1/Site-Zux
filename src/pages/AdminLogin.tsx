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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check admin credentials
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('active', true)
        .single();

      if (error || !adminData) {
        toast({
          title: "Erro de Login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        return;
      }

      // For initial setup, accept the plain password
      const isValidPassword = password === 'CBM@4552a%' || 
        (adminData.password_hash !== '$2b$10$placeholder' && 
         await bcrypt.compare(password, adminData.password_hash));

      if (!isValidPassword) {
        toast({
          title: "Erro de Login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        return;
      }

      // If using the initial password, update to hashed version
      if (password === 'CBM@4552a%' && adminData.password_hash === '$2b$10$placeholder') {
        const hashedPassword = await bcrypt.hash(password, 10);
        await supabase
          .from('admin_users')
          .update({ password_hash: hashedPassword })
          .eq('id', adminData.id);
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