import { ArrowRight, Wifi, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container-premium relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Internet Fibra Óptica Premium
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-foreground">A Melhor</span>
                <br />
                <span className="text-hero">Internet Fibra</span>
                <br />
                <span className="text-gradient">de Campo Mourão</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Fibra óptica de altíssima qualidade em Campo Mourão, Luiziana, Barbosa Ferraz, 
                Corumbataí do Sul e Iretama. WiFi 5G premium até 1 Giga com instalação gratuita.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Zap, label: 'Até 1 Giga', sub: 'Velocidade real' },
                { icon: Wifi, label: 'WiFi 5G', sub: 'Tecnologia premium' },
                { icon: Shield, label: 'Suporte 24h', sub: 'Sempre disponível' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass-card !p-4 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-premium group"
                onClick={() => {
                  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Planos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                className="btn-outline-premium"
                asChild
              >
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-4">
              {[
                { value: '12+', label: 'Cidades' },
                { value: '5000+', label: 'Clientes' },
                { value: '99.9%', label: 'Uptime' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full border border-primary/10 flex items-center justify-center animate-float">
                <div className="w-60 h-60 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                    <div className="text-center text-primary-foreground">
                      <Wifi className="w-10 h-10 mx-auto mb-2" />
                      <div className="text-3xl font-display font-bold">1 GB</div>
                      <div className="text-xs opacity-80">Fibra Óptica</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary animate-pulse-glow" style={{ animationDelay: '1s' }} />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/60 animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary/60 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
