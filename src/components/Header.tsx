import { useState } from 'react';
import { Menu, X, Phone, Mail, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-red-500/20">
      <div className="container-premium">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
            alt="Zux Internet - Melhor Internet Fibra Óptica em Campo Mourão, Luiziana e Região" 
            className="h-12 w-auto"
            width="200"
            height="48"
          />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-white hover:text-red-400 transition-colors">Início</a>
            <a 
              href="#planos" 
              className="text-white hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const plansSection = document.getElementById('planos');
                if (plansSection) {
                  plansSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Planos
            </a>
            <a href="#planos-5g" className="text-white hover:text-red-400 transition-colors">5G Móvel</a>
            <a href="#sobre" className="text-white hover:text-red-400 transition-colors">Sobre</a>
            <a href="#cobertura" className="text-white hover:text-red-400 transition-colors">Cobertura</a>
            <a href="#contato" className="text-white hover:text-red-400 transition-colors">Contato</a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-red-400" />
              <a 
                href="https://wa.me/554431102530" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                (44) 3110-2530
              </a>
            </div>
            <Button 
              variant="outline" 
              asChild
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <a href="https://erp.zux.net.br/central/" target="_blank" rel="noopener noreferrer">
                Central do Assinante
              </a>
            </Button>
            <Button 
              className="btn-premium"
              onClick={() => window.location.href = '/signup'}
            >
              Contrate Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 py-4 border-t border-red-500/20">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-white hover:text-red-400 px-4 py-2">Início</a>
              <a 
                href="#planos" 
                className="text-white hover:text-red-400 px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  const plansSection = document.getElementById('planos');
                  if (plansSection) {
                    plansSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Planos
              </a>
              <a href="#planos-5g" className="text-white hover:text-red-400 px-4 py-2">5G Móvel</a>
              <a href="#sobre" className="text-white hover:text-red-400 px-4 py-2">Sobre</a>
              <a href="#cobertura" className="text-white hover:text-red-400 px-4 py-2">Cobertura</a>
              <a href="#contato" className="text-white hover:text-red-400 px-4 py-2">Contato</a>
              <div className="px-4 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                  <a 
                    href="https://wa.me/554431102530" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(44) 3110-2530</span>
                  </a>
                </div>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
                  >
                    <a href="https://erp.zux.net.br/central/" target="_blank" rel="noopener noreferrer">
                      Central do Assinante
                    </a>
                  </Button>
                  <Button 
                    className="btn-premium w-full"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Contrate Agora
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;