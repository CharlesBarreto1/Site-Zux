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
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">Z</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Zux</h1>
              <p className="text-xs text-gray-400 -mt-1">Internet</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-white hover:text-red-400 transition-colors">Início</a>
            <a href="#planos" className="text-white hover:text-red-400 transition-colors">Planos</a>
            <a href="#sobre" className="text-white hover:text-red-400 transition-colors">Sobre</a>
            <a href="#cobertura" className="text-white hover:text-red-400 transition-colors">Cobertura</a>
            <a href="#contato" className="text-white hover:text-red-400 transition-colors">Contato</a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-red-400" />
              <a 
                href="https://wa.me/5544311025300" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                (44) 3110-2530
              </a>
            </div>
            <Button className="btn-premium">
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
              <a href="#planos" className="text-white hover:text-red-400 px-4 py-2">Planos</a>
              <a href="#sobre" className="text-white hover:text-red-400 px-4 py-2">Sobre</a>
              <a href="#cobertura" className="text-white hover:text-red-400 px-4 py-2">Cobertura</a>
              <a href="#contato" className="text-white hover:text-red-400 px-4 py-2">Contato</a>
              <div className="px-4 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                  <a 
                    href="https://wa.me/5544311025300" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(44) 3110-2530</span>
                  </a>
                </div>
                <Button className="btn-premium w-full">
                  Contrate Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;