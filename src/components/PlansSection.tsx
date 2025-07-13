import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlansSection = () => {
  const plans = [
    {
      name: "Zux Pro",
      speed: "700 Mbps",
      price: "R$ 79,90",
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
      features: [
        "700 Mbps de velocidade",
        "Wi-Fi 6 incluso",
        "Suporte técnico 24h",
        "Instalação gratuita",
        "3 meses de fidelidade",
        "Apps de streaming inclusos"
      ]
    },
    {
      name: "Zux Ultra",
      speed: "1 Giga",
      price: "R$ 99,90",
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      color: "from-red-500 to-yellow-400",
      features: [
        "1 Giga de velocidade",
        "Wi-Fi 6E Premium",
        "Suporte VIP 24h",
        "Instalação premium gratuita",
        "Sem fidelidade",
        "Todos os apps de streaming",
        "IP fixo grátis",
        "Backup 4G incluso"
      ]
    }
  ];

  return (
    <section id="planos" className="section-premium bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Escolha Seu <span className="text-red-500">Plano Premium</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos desenvolvidos para oferecer a melhor experiência em internet. 
            Tecnologia de ponta, velocidade incomparável e suporte diferenciado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`card-premium relative overflow-hidden ${plan.popular ? 'ring-2 ring-red-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-yellow-400 text-black text-center py-2 font-semibold text-sm">
                  <Star className="w-4 h-4 inline mr-1" />
                  MAIS POPULAR
                </div>
              )}

              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-black">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-red-500">{plan.speed}</div>
                  <div className="text-3xl font-bold text-black">
                    {plan.price}
                    <span className="text-lg text-gray-500 font-normal">/mês</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-premium' : 'btn-outline-premium'}`}
                    size="lg"
                    onClick={() => {
                      const message = `Olá! Gostaria de contratar o plano ${plan.name} da Zux Internet. Podem me ajudar?`;
                      const whatsappUrl = `https://wa.me/554431102530?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    Contratar {plan.name}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-600 hover:text-red-500"
                    onClick={() => window.open('https://wa.me/554431102530', '_blank')}
                  >
                    Falar com Consultor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            <strong>Empresas:</strong> Temos planos corporativos personalizados. 
            <button 
              className="text-red-500 hover:text-red-600 ml-1 font-semibold"
              onClick={() => window.open('https://wa.me/554431102530', '_blank')}
            >
              Solicite um orçamento
            </button>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Sem taxa de instalação</span>
            <span>✓ Roteador Wi-Fi incluso</span>
            <span>✓ Suporte técnico gratuito</span>
            <span>✓ Garantia de velocidade</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;