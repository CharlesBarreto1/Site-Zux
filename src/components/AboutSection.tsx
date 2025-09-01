import { Shield, Users, Award, MapPin } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Confiabilidade",
      description: "Infraestrutura robusta com 99.9% de disponibilidade garantida"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Atendimento Premium",
      description: "Suporte técnico especializado 24h por dia, 7 dias por semana"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Qualidade Superior",
      description: "Tecnologia de ponta para entregar a melhor experiência"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Cobertura Regional",
      description: "Presentes em 12+ cidades do Paraná com expansão contínua"
    }
  ];

  return (
    <section id="sobre" className="section-premium bg-black text-white">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre a <span className="text-red-500">Zux Internet</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                A Zux Internet nasceu com o propósito de conectar você ao extraordinário. 
                Somos mais que um provedor de internet - somos facilitadores de experiências digitais excepcionais.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">Nossa Missão</h3>
                <p className="text-gray-300">
                  Oferecer conectividade de altíssima qualidade com tecnologia avançada, 
                  atendimento diferenciado e suporte técnico especializado para nossos clientes.
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-6">
                <h3 className="text-2xl font-bold text-red-500 mb-2">Nossa Visão</h3>
                <p className="text-gray-300">
                  Ser reconhecida como a melhor provedora de internet do Paraná, 
                  conectando pessoas e empresas através de soluções inovadoras e serviços premium.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Localização</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sede:</strong> Avenida Liberdade 1141, Centro</p>
                <p>Luiziana - PR, CEP: 87290-000</p>
                <p><strong>Telefone:</strong> (44) 3110-2530</p>
                <p><strong>E-mail:</strong> contato@zux.net.br</p>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center lg:text-left">
              Nossos <span className="text-yellow-400">Diferenciais</span>
            </h3>
            
            <div className="grid gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-400 rounded-lg flex items-center justify-center text-black flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">2019</div>
                <div className="text-gray-400">Fundação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-gray-400">Fibra Ótica</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;