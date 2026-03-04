import { Shield, Users, Award, MapPin } from 'lucide-react';

const AboutSection = () => {
  const values = [
    { icon: <Shield className="w-6 h-6" />, title: "Confiabilidade", description: "Infraestrutura robusta com 99.9% de disponibilidade garantida" },
    { icon: <Users className="w-6 h-6" />, title: "Atendimento Premium", description: "Suporte técnico especializado 24h por dia, 7 dias por semana" },
    { icon: <Award className="w-6 h-6" />, title: "Qualidade Superior", description: "Tecnologia de ponta para entregar a melhor experiência" },
    { icon: <MapPin className="w-6 h-6" />, title: "Cobertura Regional", description: "Presentes em 12+ cidades do Paraná com expansão contínua" }
  ];

  return (
    <section id="sobre" className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0"><div className="glow-line" /></div>

      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-medium text-primary uppercase tracking-widest">Sobre Nós</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Sobre a <span className="text-gradient">Zux Internet</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Zux Internet nasceu com o propósito de conectar você ao extraordinário. 
                Somos mais que um provedor de internet — somos facilitadores de experiências digitais excepcionais.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-card !p-6 border-l-2 border-l-primary">
                <h3 className="font-display text-xl font-bold text-secondary mb-2">Nossa Missão</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Oferecer conectividade de altíssima qualidade com tecnologia avançada, 
                  atendimento diferenciado e suporte técnico especializado.
                </p>
              </div>

              <div className="glass-card !p-6 border-l-2 border-l-secondary">
                <h3 className="font-display text-xl font-bold text-primary mb-2">Nossa Visão</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ser reconhecida como a melhor provedora de internet do Paraná, 
                  conectando pessoas e empresas através de soluções inovadoras.
                </p>
              </div>
            </div>

            <div className="glass-card !p-6">
              <h3 className="font-display text-lg font-bold text-secondary mb-3">Localização</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Sede:</strong> Avenida Liberdade 1141, Centro</p>
                <p>Luiziana - PR, CEP: 87290-000</p>
                <p><strong className="text-foreground">Telefone:</strong> (44) 92004-9139</p>
                <p><strong className="text-foreground">E-mail:</strong> contato@zux.net.br</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground text-center lg:text-left">
              Nossos <span className="text-gradient-gold">Diferenciais</span>
            </h3>
            
            <div className="grid gap-4">
              {values.map((value, index) => (
                <div key={index} className="glass-card !p-5 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground flex-shrink-0" style={{ background: 'var(--gradient-primary)' }}>
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-foreground mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="glass-card !p-5 text-center">
                <div className="font-display text-3xl font-bold text-primary">2019</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Fundação</div>
              </div>
              <div className="glass-card !p-5 text-center">
                <div className="font-display text-3xl font-bold text-secondary">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Fibra Óptica</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
