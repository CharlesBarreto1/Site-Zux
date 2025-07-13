import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ana Carolina",
      location: "Maringá-PR",
      rating: 5,
      text: "A Zux Internet transformou minha experiência online. A velocidade é incrível e o suporte é excepcional. Recomendo para quem busca qualidade premium.",
      plan: "Zux Ultra 1GB"
    },
    {
      name: "Ricardo Santos",
      location: "Apucarana-PR", 
      rating: 5,
      text: "Como empresário, preciso de uma internet confiável. A Zux entrega exatamente isso: velocidade, estabilidade e um atendimento que faz a diferença.",
      plan: "Plano Empresarial"
    },
    {
      name: "Mariana Lima",
      location: "Paiçandu-PR",
      rating: 5,
      text: "Depois da Zux, não consigo imaginar usar outra internet. A qualidade é superior e o preço justo. É investimento que vale cada centavo.",
      plan: "Zux Pro 700MB"
    },
    {
      name: "Carlos Eduardo",
      location: "Cianorte-PR",
      rating: 5,
      text: "O que mais me impressiona é a estabilidade. Trabalho com streaming e nunca tive problemas. A Zux é sinônimo de confiabilidade.",
      plan: "Zux Ultra 1GB"
    }
  ];

  return (
    <section className="section-premium bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O Que Nossos <span className="text-red-500">Clientes</span> Dizem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja o que eles têm a dizer sobre a experiência Zux Internet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-gray-700 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-red-500" />
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-lg leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Client Info */}
                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-red-500 to-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                          {testimonial.plan}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">4.9</div>
                <div className="flex justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-gray-400 text-sm">Avaliação média</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">98%</div>
                <div className="text-gray-300 font-semibold">Satisfação</div>
                <div className="text-gray-400 text-sm">Clientes satisfeitos</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-gray-300 font-semibold">Recomendação</div>
                <div className="text-gray-400 text-sm">Indicariam a Zux</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Junte-se a mais de 5.000 clientes satisfeitos</p>
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="text-2xl font-bold">Google</div>
            <div className="text-2xl font-bold">Facebook</div>
            <div className="text-2xl font-bold">ReclameAqui</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;