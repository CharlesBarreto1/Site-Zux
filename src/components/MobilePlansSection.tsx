import { Check, Smartphone, Globe, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const MobilePlansSection = () => {
  const mobilePlans = [
    {
      name: "5G Essencial",
      data: "6GB",
      minutes: "100 minutos",
      price: "39,90",
      popular: false,
      features: [
        "6GB de internet móvel",
        "100 minutos para qualquer número",
        "Cobertura nacional",
        "Velocidade 5G",
        "Valor fixo sem reajuste"
      ]
    },
    {
      name: "5G Plus",
      data: "15GB", 
      minutes: "Ilimitado",
      price: "59,90",
      popular: true,
      features: [
        "15GB de internet móvel",
        "Ligações ilimitadas",
        "Cobertura nacional + 70 países",
        "Velocidade 5G",
        "Valor fixo sem reajuste"
      ]
    },
    {
      name: "5G Pro",
      data: "30GB",
      minutes: "Ilimitado", 
      price: "79,90",
      popular: false,
      features: [
        "30GB de internet móvel",
        "Ligações ilimitadas",
        "Cobertura nacional + 70 países",
        "Velocidade 5G premium",
        "Valor fixo sem reajuste"
      ]
    },
    {
      name: "5G Ultra",
      data: "45GB",
      minutes: "Ilimitado",
      price: "99,90", 
      popular: false,
      features: [
        "45GB de internet móvel",
        "Ligações ilimitadas",
        "Cobertura nacional + 70 países",
        "Velocidade 5G premium",
        "Valor fixo sem reajuste"
      ]
    }
  ];

  const handleContractPlan = (planName: string) => {
    const message = `Olá! Gostaria de contratar o plano ${planName} da Zux Internet. Podem me ajudar?`;
    const whatsappUrl = `https://wa.me/554431102530?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="planos-5g" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container-premium">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Smartphone className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Planos <span className="gradient-text">5G Móvel</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Internet móvel 5G com cobertura nacional e internacional. Planos com valor fixo, sem reajuste.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-red-400" />
              <span>Cobertura no Brasil + 70 países</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-400" />
              <span>Valor fixo, sem reajuste</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mobilePlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-gray-900/50 border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-red-500 ring-2 ring-red-500/20' 
                  : 'border-gray-700 hover:border-red-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MAIS POPULAR
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-center">
                  <span className="text-3xl font-bold text-red-400">{plan.data}</span>
                  <p className="text-gray-400 text-sm">{plan.minutes}</p>
                </div>
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-400">por apenas</span>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-400">R$</span>
                    <span className="text-4xl font-bold text-white ml-1">{plan.price}</span>
                    <span className="text-gray-400 text-sm">/mês</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleContractPlan(plan.name)}
                  className={`w-full ${plan.popular ? 'btn-premium' : 'btn-secondary'}`}
                >
                  Contratar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Dúvidas sobre nossos planos móveis? Entre em contato conosco!
          </p>
          <Button 
            onClick={() => window.open('https://wa.me/554431102530?text=Olá! Gostaria de saber mais sobre os planos móveis 5G da Zux Internet.', '_blank')}
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Falar com Consultor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobilePlansSection;