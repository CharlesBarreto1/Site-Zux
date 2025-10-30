import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminSessionValidator } from '@/lib/adminSessionValidator';


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
      // Use Supabase client to invoke edge function
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { email, password }
      });

      if (error || !data.success) {
        const errorMessage = data?.error || error?.message || 'Credenciais inválidas';
        toast({
          title: "Erro de Login",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // Store admin session using AdminSessionValidator
      AdminSessionValidator.setSession(data.session, data.user);

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