import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Eye, 
  UserX, 
  PhoneOff, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminSessionValidator } from '@/lib/adminSessionValidator';

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
  full_name?: string;
  cpf?: string;
  second_phone?: string;
  street_name?: string;
  zip_code?: string;
  address_number?: string;
  reference_point?: string;
  selected_city?: string;
  preferred_installation_period?: string;
  observations?: string;
  birth_date?: string;
  invoice_due_day?: number;
  lead_type?: string;
  source?: string;
  lgpd_consent?: boolean;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('todos');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await AdminSessionValidator.isValidSession();
      if (!isValid) {
        navigate('/admin/login');
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Get authenticated client with session token
      const client = await AdminSessionValidator.getAuthenticatedClient();
      
      const { data, error } = await client
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads((data || []) as Lead[]);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os leads. Verifique se você está autenticado.",
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

  const deleteLead = async (leadId: string) => {
    if (!confirm('Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.filter(lead => lead.id !== leadId));
      setIsDialogOpen(false);

      toast({
        title: "Lead excluído",
        description: "Lead foi excluído com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao excluir lead:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o lead.",
        variant: "destructive",
      });
    }
  };

  const updateLead = async (updatedLead: Lead) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          name: updatedLead.name,
          email: updatedLead.email,
          phone: updatedLead.phone,
          city: updatedLead.city,
          plan_type: updatedLead.plan_type,
          plan_name: updatedLead.plan_name,
          message: updatedLead.message,
          full_name: updatedLead.full_name,
          cpf: updatedLead.cpf,
          second_phone: updatedLead.second_phone,
          street_name: updatedLead.street_name,
          zip_code: updatedLead.zip_code,
          address_number: updatedLead.address_number,
          reference_point: updatedLead.reference_point,
          selected_city: updatedLead.selected_city,
          preferred_installation_period: updatedLead.preferred_installation_period,
          observations: updatedLead.observations,
          birth_date: updatedLead.birth_date,
          invoice_due_day: updatedLead.invoice_due_day,
          status: updatedLead.status
        })
        .eq('id', updatedLead.id);

      if (error) throw error;

      setLeads(leads.map(lead => 
        lead.id === updatedLead.id ? updatedLead : lead
      ));
      setEditingLead(null);
      setSelectedLead(updatedLead);

      toast({
        title: "Lead atualizado",
        description: "Dados do lead foram atualizados com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o lead.",
        variant: "destructive",
      });
    }
  };

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setEditingLead(null);
    setIsDialogOpen(true);
  };

  const openLeadEdit = (lead: Lead) => {
    setEditingLead({ ...lead });
    setSelectedLead(null);
    setIsDialogOpen(true);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate('/admin')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Gerenciar Leads</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Gerenciamento de Leads
          </h2>
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

                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openLeadDetails(lead)}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalhes
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openLeadEdit(lead)}
                    className="text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteLead(lead.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                </div>

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

      {/* Dialog para visualizar/editar lead */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {editingLead ? (
                <>
                  <Edit className="w-5 h-5" />
                  <span>Editando Lead: {editingLead.name}</span>
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  <span>Detalhes do Lead: {selectedLead?.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {editingLead ? (
            // Formulário de edição
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input
                    id="edit-name"
                    value={editingLead.name}
                    onChange={(e) => setEditingLead({...editingLead, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-full-name">Nome Completo</Label>
                  <Input
                    id="edit-full-name"
                    value={editingLead.full_name || ''}
                    onChange={(e) => setEditingLead({...editingLead, full_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">E-mail</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingLead.email}
                    onChange={(e) => setEditingLead({...editingLead, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-cpf">CPF</Label>
                  <Input
                    id="edit-cpf"
                    value={editingLead.cpf || ''}
                    onChange={(e) => setEditingLead({...editingLead, cpf: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input
                    id="edit-phone"
                    value={editingLead.phone || ''}
                    onChange={(e) => setEditingLead({...editingLead, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-second-phone">Segundo Telefone</Label>
                  <Input
                    id="edit-second-phone"
                    value={editingLead.second_phone || ''}
                    onChange={(e) => setEditingLead({...editingLead, second_phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-city">Cidade</Label>
                  <Input
                    id="edit-city"
                    value={editingLead.city || ''}
                    onChange={(e) => setEditingLead({...editingLead, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-selected-city">Cidade Selecionada</Label>
                  <Input
                    id="edit-selected-city"
                    value={editingLead.selected_city || ''}
                    onChange={(e) => setEditingLead({...editingLead, selected_city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-street">Endereço</Label>
                  <Input
                    id="edit-street"
                    value={editingLead.street_name || ''}
                    onChange={(e) => setEditingLead({...editingLead, street_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-address-number">Número</Label>
                  <Input
                    id="edit-address-number"
                    value={editingLead.address_number || ''}
                    onChange={(e) => setEditingLead({...editingLead, address_number: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-zip">CEP</Label>
                  <Input
                    id="edit-zip"
                    value={editingLead.zip_code || ''}
                    onChange={(e) => setEditingLead({...editingLead, zip_code: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-plan-type">Tipo de Plano</Label>
                  <Input
                    id="edit-plan-type"
                    value={editingLead.plan_type || ''}
                    onChange={(e) => setEditingLead({...editingLead, plan_type: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-plan-name">Nome do Plano</Label>
                  <Input
                    id="edit-plan-name"
                    value={editingLead.plan_name || ''}
                    onChange={(e) => setEditingLead({...editingLead, plan_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-installation">Período de Instalação</Label>
                  <Input
                    id="edit-installation"
                    value={editingLead.preferred_installation_period || ''}
                    onChange={(e) => setEditingLead({...editingLead, preferred_installation_period: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-reference">Ponto de Referência</Label>
                <Input
                  id="edit-reference"
                  value={editingLead.reference_point || ''}
                  onChange={(e) => setEditingLead({...editingLead, reference_point: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="edit-message">Mensagem</Label>
                <Textarea
                  id="edit-message"
                  value={editingLead.message || ''}
                  onChange={(e) => setEditingLead({...editingLead, message: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="edit-observations">Observações</Label>
                <Textarea
                  id="edit-observations"
                  value={editingLead.observations || ''}
                  onChange={(e) => setEditingLead({...editingLead, observations: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => updateLead(editingLead)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Salvar Alterações
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingLead(null)}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteLead(editingLead.id)}
                >
                  Excluir Lead
                </Button>
              </div>
            </div>
          ) : selectedLead ? (
            // Visualização dos detalhes
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{selectedLead.name}</h3>
                  {getStatusBadge(selectedLead.status)}
                </div>
                <div className="text-sm text-gray-500 flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Cadastrado em {new Date(selectedLead.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Informações Pessoais</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <strong>Nome:</strong> {selectedLead.name}
                    </div>
                    {selectedLead.full_name && (
                      <div>
                        <strong>Nome Completo:</strong> {selectedLead.full_name}
                      </div>
                    )}
                    {selectedLead.cpf && (
                      <div>
                        <strong>CPF:</strong> {selectedLead.cpf}
                      </div>
                    )}
                    {selectedLead.birth_date && (
                      <div>
                        <strong>Data de Nascimento:</strong> {new Date(selectedLead.birth_date).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Contato</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{selectedLead.email}</span>
                    </div>
                    {selectedLead.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    )}
                    {selectedLead.second_phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedLead.second_phone} (segundo)</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Endereço</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedLead.city && (
                      <div>
                        <strong>Cidade:</strong> {selectedLead.city}
                      </div>
                    )}
                    {selectedLead.selected_city && (
                      <div>
                        <strong>Cidade Selecionada:</strong> {selectedLead.selected_city}
                      </div>
                    )}
                    {selectedLead.street_name && (
                      <div>
                        <strong>Endereço:</strong> {selectedLead.street_name}
                        {selectedLead.address_number && `, ${selectedLead.address_number}`}
                      </div>
                    )}
                    {selectedLead.zip_code && (
                      <div>
                        <strong>CEP:</strong> {selectedLead.zip_code}
                      </div>
                    )}
                    {selectedLead.reference_point && (
                      <div>
                        <strong>Ponto de Referência:</strong> {selectedLead.reference_point}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Plano de Interesse</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedLead.plan_type && (
                      <div>
                        <strong>Tipo:</strong> {selectedLead.plan_type}
                      </div>
                    )}
                    {selectedLead.plan_name && (
                      <div>
                        <strong>Plano:</strong> {selectedLead.plan_name}
                      </div>
                    )}
                    {selectedLead.preferred_installation_period && (
                      <div>
                        <strong>Período de Instalação:</strong> {selectedLead.preferred_installation_period}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {(selectedLead.message || selectedLead.observations) && (
                <div className="space-y-4">
                  {selectedLead.message && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Mensagem</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded">
                          {selectedLead.message}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {selectedLead.observations && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Observações</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded">
                          {selectedLead.observations}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              <div className="flex space-x-4 pt-4 border-t">
                <Button 
                  onClick={() => openLeadEdit(selectedLead)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Lead
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteLead(selectedLead.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Lead
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLeads;