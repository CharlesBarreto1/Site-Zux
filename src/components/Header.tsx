import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#planos', label: 'Planos' },
    { href: '#planos-5g', label: '5G Móvel' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#cobertura', label: 'Cobertura' },
    { href: '#contato', label: 'Contato' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/50' 
        : 'bg-transparent'
    }`}>
      <div className="container-premium">
        <div className="flex items-center justify-between h-20">
          <img 
            src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
            alt="Zux Internet - Melhor Internet Fibra Óptica em Campo Mourão, Luiziana e Região" 
            className="h-10 w-auto"
            width="200"
            height="40"
          />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <a href="https://erp.zux.net.br/central/" target="_blank" rel="noopener noreferrer">
                Central do Assinante
              </a>
            </Button>
            <Button className="btn-premium !px-6 !py-2.5 !text-sm" asChild>
              <a href={getWhatsAppUrl('Olá! Gostaria de contratar um plano Zux Internet.')} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Contrate Agora
              </a>
            </Button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-foreground p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 py-6 animate-slide-up">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-foreground hover:text-primary px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-4 mt-2 border-t border-border/50 space-y-3">
                <Button variant="outline" asChild className="w-full border-border text-muted-foreground">
                  <a href="https://erp.zux.net.br/central/" target="_blank" rel="noopener noreferrer">
                    Central do Assinante
                  </a>
                </Button>
                <Button className="btn-premium w-full" asChild>
                  <a href={getWhatsAppUrl('Olá! Gostaria de contratar um plano Zux Internet.')} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 mr-2" />
                    Contrate Agora
                  </a>
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
