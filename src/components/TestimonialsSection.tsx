import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Ana Carolina", location: "Maringá-PR", rating: 5, text: "A Zux Internet transformou minha experiência online. A velocidade é incrível e o suporte é excepcional.", plan: "Zux Ultra 1GB" },
    { name: "Ricardo Santos", location: "Apucarana-PR", rating: 5, text: "Como empresário, preciso de internet confiável. A Zux entrega exatamente isso: velocidade, estabilidade e atendimento diferenciado.", plan: "Plano Empresarial" },
    { name: "Mariana Lima", location: "Paiçandu-PR", rating: 5, text: "Depois da Zux, não consigo imaginar usar outra internet. A qualidade é superior e o preço justo.", plan: "Zux Pro 700MB" },
    { name: "Carlos Eduardo", location: "Cianorte-PR", rating: 5, text: "O que mais me impressiona é a estabilidade. Trabalho com streaming e nunca tive problemas.", plan: "Zux Ultra 1GB" }
  ];

  return (
    <section className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0"><div className="glow-line" /></div>

      <div className="container-premium">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Depoimentos</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            O Que Nossos <span className="text-gradient">Clientes</span> Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <div key={index} className="glass-card group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 text-primary/40" />
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  "{t.text}"
                </p>

                <div className="glow-line !h-px opacity-20" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-foreground">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {t.plan}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="glass-card max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-display text-3xl font-bold text-primary mb-1">4.9</div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-secondary fill-current" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Avaliação média</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-secondary mb-1">98%</div>
                <div className="text-xs text-muted-foreground">Satisfação</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground mb-1">95%</div>
                <div className="text-xs text-muted-foreground">Recomendação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
