import { Check, Smartphone, Globe, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const MobilePlansSection = () => {
  const mobilePlans = [
    { name: "5G Essencial", data: "6GB", minutes: "100 minutos", price: "39,90", popular: false,
      features: ["6GB de internet móvel", "100 minutos", "Cobertura nacional", "Velocidade 5G", "Valor fixo"] },
    { name: "5G Plus", data: "15GB", minutes: "Ilimitado", price: "59,90", popular: true,
      features: ["15GB de internet móvel", "Ligações ilimitadas", "Nacional + 70 países", "Velocidade 5G", "Valor fixo"] },
    { name: "5G Pro", data: "30GB", minutes: "Ilimitado", price: "79,90", popular: false,
      features: ["30GB de internet móvel", "Ligações ilimitadas", "Nacional + 70 países", "5G premium", "Valor fixo"] },
    { name: "5G Ultra", data: "45GB", minutes: "Ilimitado", price: "99,90", popular: false,
      features: ["45GB de internet móvel", "Ligações ilimitadas", "Nacional + 70 países", "5G premium", "Valor fixo"] }
  ];

  const handleContractPlan = (planName: string) => {
    const message = `Olá! Gostaria de contratar o plano *${planName}* da Zux Internet. Podem me ajudar?`;
    window.location.assign(getWhatsAppUrl(message));
  };

  return (
    <section id="planos-5g" className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0"><div className="glow-line" /></div>
      
      <div className="container-premium">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-widest">
            <Smartphone className="w-4 h-4" />
            Planos Móveis
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Planos <span className="text-gradient">5G Móvel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Internet móvel 5G com cobertura nacional e internacional. Valor fixo, sem reajuste.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Brasil + 70 países</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Valor fixo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobilePlans.map((plan) => (
            <div 
              key={plan.name}
              className={`card-premium relative ${plan.popular ? 'ring-1 ring-primary/50' : ''}`}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-primary)' }} />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground" style={{ background: 'var(--gradient-primary)' }}>
                      MAIS POPULAR
                    </span>
                  </div>
                </>
              )}
              
              <div className="space-y-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                  <Smartphone className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                
                <div>
                  <span className="font-display text-3xl font-bold text-primary">{plan.data}</span>
                  <p className="text-xs text-muted-foreground mt-1">{plan.minutes}</p>
                </div>

                <div>
                  <span className="text-xs text-muted-foreground">R$ </span>
                  <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">/mês</span>
                </div>

                <div className="glow-line !h-px opacity-20" />

                <ul className="space-y-2 text-left">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleContractPlan(plan.name)}
                  className={`w-full group ${plan.popular ? 'btn-premium' : 'btn-outline-premium'}`}
                >
                  Contratar
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm mb-4">Dúvidas sobre os planos móveis?</p>
          <Button className="btn-outline-premium" asChild>
            <a href={getWhatsAppUrl('Olá! Gostaria de saber mais sobre os planos móveis 5G da Zux Internet.')} target="_blank" rel="noopener noreferrer">
              Falar com Consultor
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobilePlansSection;
