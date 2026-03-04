import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const FloatingWhatsApp = () => {
  return (
    <a
      href={getWhatsAppUrl('Olá! Gostaria de mais informações sobre os planos da Zux Internet.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Fale conosco no WhatsApp
        <div className="absolute top-full right-6 w-2 h-2 bg-card border-r border-b border-border transform rotate-45 -mt-1" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
