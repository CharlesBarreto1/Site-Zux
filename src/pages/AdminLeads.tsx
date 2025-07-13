import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  UserX, 
  PhoneOff, 
  CheckCircle, 
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  plan_type?: string;
  plan_name?: string;
  message?: string;
  status: 'novo' | 'sem_viabilidade' | 'desistiu' | 'sem_contato' | 'contratou';
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('todos');
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads((data || []) as Lead[]);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os leads.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));

      toast({
        title: "Status atualizado",
        description: "Status do lead foi atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    const statusConfig = {
      novo: { color: 'bg-blue-500', icon: Eye, label: 'Novo' },
      sem_viabilidade: { color: 'bg-red-500', icon: UserX, label: 'Sem Viabilidade' },
      desistiu: { color: 'bg-orange-500', icon: AlertTriangle, label: 'Desistiu' },
      sem_contato: { color: 'bg-gray-500', icon: PhoneOff, label: 'Sem Contato' },
      contratou: { color: 'bg-green-500', icon: CheckCircle, label: 'Contratou!' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'todos') return true;
    return lead.status === filter;
  });

  const getFilterCount = (status: string) => {
    if (status === 'todos') return leads.length;
    return leads.filter(lead => lead.status === status).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Carregando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciamento de Leads
          </h1>
          <p className="text-gray-600">
            Gerencie todos os leads capturados pelo site da Zux Internet
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: 'todos', label: 'Todos' },
            { key: 'novo', label: 'Novos' },
            { key: 'sem_viabilidade', label: 'Sem Viabilidade' },
            { key: 'desistiu', label: 'Desistiu' },
            { key: 'sem_contato', label: 'Sem Contato' },
            { key: 'contratou', label: 'Contratou' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              onClick={() => setFilter(key)}
              className="flex items-center space-x-2"
            >
              <span>{label}</span>
              <Badge variant="secondary">
                {getFilterCount(key)}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Lista de Leads */}
        <div className="grid gap-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Users className="w-5 h-5 text-red-500" />
                    <span>{lead.name}</span>
                    {getStatusBadge(lead.status)}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p><strong>Email:</strong> {lead.email}</p>
                    {lead.phone && <p><strong>Telefone:</strong> {lead.phone}</p>}
                    {lead.city && <p><strong>Cidade:</strong> {lead.city}</p>}
                  </div>
                  <div>
                    {lead.plan_type && <p><strong>Tipo de Plano:</strong> {lead.plan_type}</p>}
                    {lead.plan_name && <p><strong>Plano:</strong> {lead.plan_name}</p>}
                  </div>
                </div>
                
                {lead.message && (
                  <div className="mb-4">
                    <p><strong>Mensagem:</strong></p>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded mt-1">
                      {lead.message}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {lead.status !== 'sem_viabilidade' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateLeadStatus(lead.id, 'sem_viabilidade')}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <UserX className="w-4 h-4 mr-1" />
                      Sem Viabilidade
                    </Button>
                  )}
                  
                  {lead.status !== 'desistiu' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateLeadStatus(lead.id, 'desistiu')}
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Desistiu
                    </Button>
                  )}
                  
                  {lead.status !== 'sem_contato' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateLeadStatus(lead.id, 'sem_contato')}
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      <PhoneOff className="w-4 h-4 mr-1" />
                      Sem Contato
                    </Button>
                  )}
                  
                  {lead.status !== 'contratou' && (
                    <Button
                      size="sm"
                      onClick={() => updateLeadStatus(lead.id, 'contratou')}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Contratou!
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum lead encontrado
            </h3>
            <p className="text-gray-500">
              {filter === 'todos' 
                ? 'Ainda não há leads cadastrados no sistema.'
                : `Não há leads com o status "${filter}".`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;