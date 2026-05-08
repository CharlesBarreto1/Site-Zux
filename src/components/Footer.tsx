import { Phone, Mail, MapPin, Instagram, Globe } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50">
      <div className="container-premium py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <img 
              src="/lovable-uploads/8b9b1ca3-626f-4f88-bf1d-226672ebc39f.png" 
              alt="Zux Internet - Provedor de Internet Fibra Óptica em Campo Mourão e Região" 
              className="h-9 w-auto"
              width="200"
              height="36"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conectando você ao extraordinário através de internet fibra óptica de altíssima qualidade.
            </p>
            <div className="flex gap-3">
              {[
                { href: getWhatsAppUrl(), icon: Phone, bg: 'bg-green-600' },
                { href: 'https://instagram.com/zuxinternet', icon: Instagram, bg: 'bg-purple-600' },
                { href: 'mailto:contato@zux.net.br', icon: Mail, bg: 'bg-primary' },
                { href: 'https://www.zux.net.br', icon: Globe, bg: 'bg-muted' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}>
                  <s.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-foreground mb-5 uppercase tracking-wider">Links Rápidos</h3>
            <ul className="space-y-3">
              {['Início', 'Planos', 'Sobre Nós', 'Cobertura', 'Contato'].map(label => (
                <li key={label}>
                  <a href={`#${label === 'Sobre Nós' ? 'sobre' : label === 'Início' ? 'inicio' : label.toLowerCase()}`} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-foreground mb-5 uppercase tracking-wider">Serviços</h3>
            <ul className="space-y-3">
              {['Internet Residencial', 'Internet Empresarial', 'Suporte Técnico', 'Instalação Gratuita', 'Wi-Fi Premium'].map(s => (
                <li key={s}><span className="text-sm text-muted-foreground">{s}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-foreground mb-5 uppercase tracking-wider">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Avenida Liberdade 1141, Centro<br/>Luiziana - PR, 87290-000</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">(44) 3110-2530</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contato@zux.net.br" className="text-sm text-muted-foreground hover:text-foreground transition-colors">contato@zux.net.br</a>
              </div>
              <div className="glass-card !p-4 mt-4">
                <h4 className="text-xs font-bold text-foreground mb-1">Atendimento</h4>
                <p className="text-xs text-muted-foreground">
                  Seg-Sex: 8h–18h | Sáb: 8h–12h<br/>
                  <span className="text-primary font-medium">Suporte 24h</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-muted-foreground">© {currentYear} Zux Internet. Todos os direitos reservados.</span>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
