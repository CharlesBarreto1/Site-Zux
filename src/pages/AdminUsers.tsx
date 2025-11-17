import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Edit, Trash2, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminSessionValidator } from '@/lib/adminSessionValidator';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  active: boolean;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    active: true
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await AdminSessionValidator.isValidSession();
      if (!isValid) {
        navigate('/admin/login');
        return;
      }
      fetchUsers();
    };
    checkAuth();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const client = await AdminSessionValidator.getAuthenticatedClient();
      const { data, error } = await client
        .from('admin_users')
        .select('id, email, name, active, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      password: '',
      active: true
    });
    setIsCreating(false);
    setEditingUser(null);
  };

  const handleEdit = (user: AdminUser) => {
    setFormData({
      email: user.email,
      name: user.name,
      password: '',
      active: user.active
    });
    setEditingUser(user);
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        // Update existing user
        const updateData: any = {
          email: formData.email,
          name: formData.name,
          active: formData.active
        };

        // Only update password if provided - hash using edge function
        if (formData.password) {
          const { data: hashData, error: hashError } = await supabase.functions.invoke('hash-password', {
            body: { password: formData.password }
          });

          if (hashError) throw new Error('Erro ao processar senha: ' + hashError.message);
          updateData.bcrypt_password_hash = hashData.hash;
        }

        const client = await AdminSessionValidator.getAuthenticatedClient();
        const { error } = await client
          .from('admin_users')
          .update(updateData)
          .eq('id', editingUser.id);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Usuário atualizado com sucesso!" });
      } else {
        // Create new user
        if (!formData.password) {
          toast({
            title: "Erro",
            description: "Senha é obrigatória para novos usuários.",
            variant: "destructive",
          });
          return;
        }

        // Hash password using edge function
        const { data: hashData, error: hashError } = await supabase.functions.invoke('hash-password', {
          body: { password: formData.password }
        });

        if (hashError) throw new Error('Erro ao processar senha: ' + hashError.message);

        const client = await AdminSessionValidator.getAuthenticatedClient();
        const { error } = await client
          .from('admin_users')
          .insert([{
            email: formData.email,
            name: formData.name,
            password_hash: 'DEPRECATED',
            bcrypt_password_hash: hashData.hash,
            active: formData.active
          }]);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Usuário criado com sucesso!" });
      }

      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível salvar o usuário.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const client = await AdminSessionValidator.getAuthenticatedClient();
      const { error } = await client
        .from('admin_users')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      
      toast({ title: "Sucesso", description: "Usuário excluído com sucesso!" });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o usuário.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate('/admin')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Gerenciar Usuários</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Usuários Administrativos</h2>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingUser ? 'Editar' : 'Criar Novo'} Usuário Administrativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">
                      {editingUser ? 'Nova Senha (deixe vazio para manter)' : 'Senha'}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required={!editingUser}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                    />
                    <Label htmlFor="active">Usuário Ativo</Label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={loading}>
                    {editingUser ? 'Atualizar' : 'Criar'} Usuário
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-red-500" />
                      <span>{user.name}</span>
                      {!user.active && <Badge variant="secondary">Inativo</Badge>}
                    </CardTitle>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">
                  Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </div>
                <div className="mt-2">
                  <Badge className={user.active ? 'bg-green-500' : 'bg-gray-500'}>
                    {user.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-gray-500">
              Crie o primeiro usuário administrativo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;