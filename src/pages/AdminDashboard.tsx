import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Globe, LogOut, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_user');
    if (!storedAdmin) {
      navigate('/admin/login');
      return;
    }
    setAdminUser(JSON.parse(storedAdmin));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    toast({
      title: "Logout realizado",
      description: "Até mais!",
    });
    navigate('/admin/login');
  };

  if (!adminUser) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
                alt="Zux Internet" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-semibold text-white">Painel Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Olá, {adminUser.name || adminUser.email}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Gerencie seu site e visualize informações importantes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Leads Management */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/leads')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gerenciar Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Acessar</div>
              <p className="text-xs text-muted-foreground">
                Visualize e gerencie todos os leads cadastrados
              </p>
            </CardContent>
          </Card>

          {/* Plans Management */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/plans')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gerenciar Planos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Criar/Editar</div>
              <p className="text-xs text-muted-foreground">
                Adicione e edite planos de internet e móvel
              </p>
            </CardContent>
          </Card>

          {/* Site Content */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/content')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conteúdo do Site</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Editar</div>
              <p className="text-xs text-muted-foreground">
                Edite textos, banners e informações gerais
              </p>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Admin</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Gerenciar</div>
              <p className="text-xs text-muted-foreground">
                Adicione e gerencie usuários administrativos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acesso Rápido</h3>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => window.open('/', '_blank')} variant="outline">
              Ver Site Principal
            </Button>
            <Button onClick={() => navigate('/admin/leads')} variant="outline">
              Ver Leads Recentes
            </Button>
            <Button onClick={() => navigate('/signup')} variant="outline">
              Página de Contratação
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;