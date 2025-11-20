import { Phone, Mail, MapPin, Instagram, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container-premium py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <img 
              src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
              alt="Zux Internet - Provedor de Internet Fibra Óptica em Campo Mourão e Região" 
              className="h-10 w-auto mb-4"
              width="200"
              height="40"
            />
            
            <p className="text-gray-400 leading-relaxed">
              Conectando você ao extraordinário através de internet fibra ótica de altíssima qualidade 
              e atendimento premium.
            </p>

            <div className="flex space-x-4">
              <a 
                href="https://wa.me/554431102530"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://instagram.com/zuxinternet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="mailto:contato@zux.net.br"
                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.zux.net.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Globe className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-gray-400 hover:text-red-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#planos" className="text-gray-400 hover:text-red-400 transition-colors">
                  Planos
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-red-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#cobertura" className="text-gray-400 hover:text-red-400 transition-colors">
                  Cobertura
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-red-400 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Internet Residencial</span>
              </li>
              <li>
                <span className="text-gray-400">Internet Empresarial</span>
              </li>
              <li>
                <span className="text-gray-400">Suporte Técnico</span>
              </li>
              <li>
                <span className="text-gray-400">Instalação Gratuita</span>
              </li>
              <li>
                <span className="text-gray-400">Wi-Fi Premium</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div className="text-gray-400 text-sm">
                  Avenida Liberdade 1141, Centro
                  <br />
                  Luiziana - PR, CEP: 87290-000
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400" />
                <a 
                  href="https://wa.me/554431102530" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  (44) 3110-2530
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <a 
                  href="mailto:contato@zux.net.br"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contato@zux.net.br
                </a>
              </div>
            </div>

            <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Atendimento</h4>
              <p className="text-gray-400 text-sm">
                Segunda a Sexta: 8h às 18h
                <br />
                Sábado: 8h às 12h
                <br />
                <span className="text-green-400 font-semibold">Suporte 24h</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Zux Internet. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <span className="text-gray-600">
                Desenvolvido com ❤️ para conectar você ao extraordinário
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;