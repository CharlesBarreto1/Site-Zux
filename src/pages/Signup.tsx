import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number;
  features: any;
  popular: boolean;
}

interface MobilePlan {
  id: string;
  name: string;
  data_amount: string;
  minutes: string;
  price: number;
  features: any;
  popular: boolean;
}

interface City {
  id: string;
  name: string;
  state: string;
}

const Signup = () => {
  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [mobilePlans, setMobilePlans] = useState<MobilePlan[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [planType, setPlanType] = useState<'internet' | 'mobile'>('internet');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    phone: '',
    secondPhone: '',
    email: '',
    streetName: '',
    zipCode: '',
    addressNumber: '',
    referencePoint: '',
    selectedCity: '',
    invoiceDueDay: '',
    preferredInstallationPeriod: '',
    observations: '',
    lgpdConsent: false
  });

  useEffect(() => {
    fetchPlans();
    fetchMobilePlans();
    fetchCities();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('internet_plans')
        .select('*')
        .eq('active', true)
        .order('price');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchMobilePlans = async () => {
    try {
      const { data, error } = await supabase
        .from('mobile_plans')
        .select('*')
        .eq('active', true)
        .order('price');

      if (error) throw error;
      setMobilePlans(data || []);
    } catch (error) {
      console.error('Error fetching mobile plans:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setCities(data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.lgpdConsent) {
      toast({
        title: "Erro",
        description: "É necessário aceitar os termos da LGPD",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const selectedPlanData = planType === 'internet' 
        ? plans.find(p => p.id === selectedPlan)
        : mobilePlans.find(p => p.id === selectedPlan);

      const leadData = {
        lead_type: 'signup',
        full_name: formData.fullName,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        second_phone: formData.secondPhone,
        cpf: formData.cpf,
        birth_date: formData.birthDate,
        street_name: formData.streetName,
        zip_code: formData.zipCode,
        address_number: formData.addressNumber,
        reference_point: formData.referencePoint,
        selected_city: formData.selectedCity,
        invoice_due_day: parseInt(formData.invoiceDueDay),
        preferred_installation_period: formData.preferredInstallationPeriod,
        observations: formData.observations,
        lgpd_consent: formData.lgpdConsent,
        plan_name: selectedPlanData?.name,
        plan_type: planType,
        status: 'novo'
      };

      const { error } = await supabase
        .from('leads')
        .insert(leadData);

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Contratação realizada!",
        description: "Seus dados foram enviados com sucesso. Entraremos em contato em breve!",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contratação Realizada!</h2>
            <p className="text-gray-600 mb-6">
              Obrigado por escolher a Zux Internet! Seus dados foram enviados com sucesso e nossa equipe entrará em contato em breve para agendar a instalação.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Voltar ao Site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-red-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <img 
            src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
            alt="Zux Internet" 
            className="h-10 w-auto"
          />
          <Button 
            variant="outline" 
            onClick={() => {
              window.open('https://wa.me/554431102530?text=Olá! Gostaria de contratar um plano da Zux Internet pelo WhatsApp.', '_blank');
            }}
            className="flex items-center space-x-2 border-red-400 bg-red-500 text-white hover:bg-red-600 hover:border-red-500"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Quero contratar pelo WhatsApp</span>
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 py-8">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Escolha seu plano</CardTitle>
              <div className="flex justify-center space-x-4 mt-4">
                <Button 
                  variant={planType === 'internet' ? 'default' : 'outline'}
                  onClick={() => setPlanType('internet')}
                >
                  Internet Fibra
                </Button>
                <Button 
                  variant={planType === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setPlanType('mobile')}
                >
                  Internet Móvel 5G
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(planType === 'internet' ? plans : mobilePlans).map((plan) => (
                  <div 
                    key={plan.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-red-300'
                    } ${plan.popular ? 'ring-2 ring-red-200' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">
                        Mais Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    {'speed' in plan && <p className="text-gray-600">{plan.speed}</p>}
                    {'data_amount' in plan && (
                      <p className="text-gray-600">{plan.data_amount} + {plan.minutes}</p>
                    )}
                    <div className="text-3xl font-bold text-red-600 my-4">
                      R$ {plan.price.toFixed(2)}
                      <span className="text-lg text-gray-500">/mês</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features?.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!selectedPlan}
                  size="lg"
                >
                  Continuar com este plano
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Seus dados pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone de contato *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="secondPhone">Segundo telefone</Label>
                  <Input
                    id="secondPhone"
                    value={formData.secondPhone}
                    onChange={(e) => handleInputChange('secondPhone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button onClick={() => setStep(3)}>
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Endereço e instalação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="streetName">Nome da rua *</Label>
                  <Input
                    id="streetName"
                    value={formData.streetName}
                    onChange={(e) => handleInputChange('streetName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">CEP *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="addressNumber">Número do endereço *</Label>
                  <Input
                    id="addressNumber"
                    value={formData.addressNumber}
                    onChange={(e) => handleInputChange('addressNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="referencePoint">Ponto de referência *</Label>
                  <Input
                    id="referencePoint"
                    value={formData.referencePoint}
                    onChange={(e) => handleInputChange('referencePoint', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="selectedCity">Cidade *</Label>
                  <Select value={formData.selectedCity} onValueChange={(value) => handleInputChange('selectedCity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name} - {city.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="invoiceDueDay">Dia do vencimento da fatura *</Label>
                  <Select value={formData.invoiceDueDay} onValueChange={(value) => handleInputChange('invoiceDueDay', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Dia 05</SelectItem>
                      <SelectItem value="10">Dia 10</SelectItem>
                      <SelectItem value="15">Dia 15</SelectItem>
                      <SelectItem value="20">Dia 20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="preferredInstallationPeriod">Melhor período para receber o técnico *</Label>
                  <Select value={formData.preferredInstallationPeriod} onValueChange={(value) => handleInputChange('preferredInstallationPeriod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">Manhã</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="observations">Observações *</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => handleInputChange('observations', e.target.value)}
                    placeholder="Informações adicionais, instruções especiais para instalação, etc."
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lgpd"
                  checked={formData.lgpdConsent}
                  onCheckedChange={(checked) => handleInputChange('lgpdConsent', !!checked)}
                />
                <Label htmlFor="lgpd" className="text-sm">
                  Eu concordo com o tratamento dos meus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD) *
                </Label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Enviando...' : 'Finalizar Contratação'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Signup;