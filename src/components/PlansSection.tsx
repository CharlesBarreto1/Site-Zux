import { Check, Star, Crown, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const PlansSection = () => {
  const plans = [
    {
      name: "Zux Pro",
      speed: "700 Mbps",
      price: "129,90",
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      features: [
        "700 Mbps de velocidade",
        "Wi-Fi 6 incluso",
        "Suporte técnico 24h",
        "Instalação gratuita",
      ]
    },
    {
      name: "Zux Ultra",
      speed: "1 Giga",
      price: "169,90",
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      features: [
        "1 Giga de velocidade",
        "Wi-Fi 6E Premium",
        "Suporte VIP 24h",
        "Instalação premium gratuita",
      ]
    }
  ];

  const handleSelectPlan = (planName: string, speed: string) => {
    const message = `Olá! Tenho interesse no plano *${planName}* (${speed}). Gostaria de mais informações e de contratar!`;
    window.location.assign(getWhatsAppUrl(message));
  };

  return (
    <section id="planos" className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0">
        <div className="glow-line" />
      </div>
      
      <div className="container-premium">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Planos de Internet</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Escolha Seu <span className="text-gradient">Plano Premium</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta, velocidade incomparável e suporte diferenciado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`card-premium relative overflow-hidden ${
                plan.popular ? 'ring-1 ring-primary/50 scale-[1.02]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-primary)' }} />
              )}
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-secondary-foreground" style={{ background: 'var(--gradient-gold)' }}>
                    <Star className="w-3 h-3" /> POPULAR
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: plan.popular ? 'var(--gradient-primary)' : 'var(--gradient-glass)', border: plan.popular ? 'none' : '1px solid hsl(var(--border))' }}>
                    <span className={plan.popular ? '' : 'text-primary'}>{plan.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                    <div className="text-sm text-muted-foreground">{plan.speed}</div>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="font-display text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>

                <div className="glow-line !h-px opacity-30" />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full group ${plan.popular ? 'btn-premium' : 'btn-outline-premium'}`}
                  size="lg"
                  onClick={() => handleSelectPlan(plan.name, plan.speed)}
                >
                  Contratar {plan.name}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Empresas:</strong> Temos planos corporativos personalizados.{' '}
            <a 
              href={getWhatsAppUrl('Olá! Gostaria de informações sobre planos empresariais.')} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Solicite um orçamento →
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-primary" /> Sem taxa de instalação</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-primary" /> Roteador Wi-Fi incluso</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-primary" /> Suporte técnico gratuito</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-primary" /> Garantia de velocidade</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
