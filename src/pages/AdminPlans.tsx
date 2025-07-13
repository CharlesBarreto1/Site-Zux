import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Edit, Trash2, Wifi, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Plan {
  id: string;
  name: string;
  speed?: string;
  data_amount?: string;
  minutes?: string;
  price: number;
  features: any;
  popular: boolean;
  active: boolean;
}

const AdminPlans = () => {
  const [internetPlans, setInternetPlans] = useState<Plan[]>([]);
  const [mobilePlans, setMobilePlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planType, setPlanType] = useState<'internet' | 'mobile'>('internet');
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    data_amount: '',
    minutes: '',
    price: '',
    features: '',
    popular: false,
    active: true
  });

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user');
    if (!adminUser) {
      navigate('/admin/login');
      return;
    }
    fetchPlans();
  }, [navigate]);

  const fetchPlans = async () => {
    try {
      const [internetResult, mobileResult] = await Promise.all([
        supabase.from('internet_plans').select('*').order('price'),
        supabase.from('mobile_plans').select('*').order('price')
      ]);

      if (internetResult.error) throw internetResult.error;
      if (mobileResult.error) throw mobileResult.error;

      setInternetPlans((internetResult.data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })));
      setMobilePlans((mobileResult.data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })));
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os planos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      speed: '',
      data_amount: '',
      minutes: '',
      price: '',
      features: '',
      popular: false,
      active: true
    });
    setIsCreating(false);
    setEditingPlan(null);
  };

  const handleEdit = (plan: Plan) => {
    setFormData({
      name: plan.name,
      speed: plan.speed || '',
      data_amount: plan.data_amount || '',
      minutes: plan.minutes || '',
      price: plan.price.toString(),
      features: Array.isArray(plan.features) ? plan.features.join('\n') : '',
      popular: plan.popular,
      active: plan.active
    });
    setEditingPlan(plan);
    setIsCreating(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const planData = {
        name: formData.name,
        price: parseFloat(formData.price),
        features: formData.features.split('\n').filter(f => f.trim()),
        popular: formData.popular,
        active: formData.active,
        ...(planType === 'internet' 
          ? { speed: formData.speed }
          : { data_amount: formData.data_amount, minutes: formData.minutes }
        )
      };

      const table = planType === 'internet' ? 'internet_plans' : 'mobile_plans';

      if (editingPlan) {
        const { error } = await supabase
          .from(table)
          .update(planData)
          .eq('id', editingPlan.id);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Plano atualizado com sucesso!" });
      } else {
        const { error } = await supabase
          .from(table)
          .insert(planData);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Plano criado com sucesso!" });
      }

      resetForm();
      fetchPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o plano.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano?')) return;

    try {
      const table = planType === 'internet' ? 'internet_plans' : 'mobile_plans';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', planId);

      if (error) throw error;
      
      toast({ title: "Sucesso", description: "Plano excluído com sucesso!" });
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o plano.",
        variant: "destructive",
      });
    }
  };

  const currentPlans = planType === 'internet' ? internetPlans : mobilePlans;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Carregando planos...</p>
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
              <h1 className="text-xl font-semibold text-gray-900">Gerenciar Planos</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Planos</h2>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button 
              variant={planType === 'internet' ? 'default' : 'outline'}
              onClick={() => setPlanType('internet')}
            >
              <Wifi className="w-4 h-4 mr-2" />
              Internet Fibra
            </Button>
            <Button 
              variant={planType === 'mobile' ? 'default' : 'outline'}
              onClick={() => setPlanType('mobile')}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Internet Móvel 5G
            </Button>
          </div>
        </div>

        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingPlan ? 'Editar' : 'Criar Novo'} Plano de {planType === 'internet' ? 'Internet' : 'Móvel'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Plano</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  {planType === 'internet' ? (
                    <div>
                      <Label htmlFor="speed">Velocidade</Label>
                      <Input
                        id="speed"
                        value={formData.speed}
                        onChange={(e) => setFormData(prev => ({ ...prev, speed: e.target.value }))}
                        placeholder="Ex: 500 Mbps"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="data_amount">Dados</Label>
                        <Input
                          id="data_amount"
                          value={formData.data_amount}
                          onChange={(e) => setFormData(prev => ({ ...prev, data_amount: e.target.value }))}
                          placeholder="Ex: 20GB"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="minutes">Minutos</Label>
                        <Input
                          id="minutes"
                          value={formData.minutes}
                          onChange={(e) => setFormData(prev => ({ ...prev, minutes: e.target.value }))}
                          placeholder="Ex: Ilimitado"
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="features">Recursos (um por linha)</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="Ex:&#10;Wi-Fi grátis&#10;Suporte 24h&#10;Instalação gratuita"
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={formData.popular}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
                    />
                    <Label htmlFor="popular">Plano Popular</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                    />
                    <Label htmlFor="active">Ativo</Label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={loading}>
                    {editingPlan ? 'Atualizar' : 'Criar'} Plano
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
          {currentPlans.map((plan) => (
            <Card key={plan.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{plan.name}</span>
                      {plan.popular && <Badge className="bg-red-500">Popular</Badge>}
                      {!plan.active && <Badge variant="secondary">Inativo</Badge>}
                    </CardTitle>
                    {plan.speed && <p className="text-gray-600">{plan.speed}</p>}
                    {plan.data_amount && (
                      <p className="text-gray-600">{plan.data_amount} + {plan.minutes}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(plan.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600 mb-4">
                  R$ {plan.price.toFixed(2)}
                  <span className="text-lg text-gray-500">/mês</span>
                </div>
                <ul className="space-y-1">
                  {(Array.isArray(plan.features) ? plan.features : []).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentPlans.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum plano encontrado
            </h3>
            <p className="text-gray-500">
              Crie seu primeiro plano de {planType === 'internet' ? 'internet' : 'móvel'}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPlans;