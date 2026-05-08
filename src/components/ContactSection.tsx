import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { CITY_LABELS } from '@/data/cities';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().regex(/^[\d\s()-]+$/, 'Telefone inválido').min(10).max(20),
  city: z.string().min(1, 'Selecione uma cidade'),
  message: z.string().max(1000).optional()
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', message: '' });

  const cities = CITY_LABELS;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const v = contactSchema.parse(formData);

      const message = `Olá! Gostaria de mais informações sobre os planos da Zux Internet.\n\n*Dados de Contato:*\nNome: ${v.name}\nEmail: ${v.email}\nTelefone: ${v.phone}\nCidade: ${v.city}\n\n*Mensagem:*\n${v.message || 'Não informada'}`;
      window.location.assign(getWhatsAppUrl(message));

      toast({ title: "Sucesso!", description: "Redirecionando para nosso WhatsApp." });
      setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Erro de validação", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Erro", description: "Houve um problema no envio. Tente novamente.", variant: "destructive" });
      }
    }
  };

  const inputClass = "w-full p-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm";

  const contactInfo = [
    { icon: Phone, color: 'bg-primary', title: 'Telefone', content: <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">(44) 3110-2530</a>, sub: 'WhatsApp disponível 24h' },
    { icon: Mail, color: 'bg-secondary', title: 'E-mail', content: <a href="mailto:contato@zux.net.br" className="text-primary hover:underline font-medium">contato@zux.net.br</a>, sub: 'Resposta em até 24h' },
    { icon: MapPin, color: 'bg-primary', title: 'Endereço', content: <span className="text-muted-foreground text-sm">Avenida Liberdade 1141, Centro<br/>Luiziana - PR, 87290-000</span>, sub: '' },
    { icon: Clock, color: 'bg-primary', title: 'Atendimento', content: <span className="text-muted-foreground text-sm">Seg-Sex: 8h–18h | Sáb: 8h–12h</span>, sub: 'Suporte técnico 24h' },
  ];

  return (
    <section id="contato" className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0"><div className="glow-line" /></div>

      <div className="container-premium">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Contato</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para conectar você ao extraordinário.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="card-premium space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Send className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Fale Conosco</h3>
                <p className="text-xs text-muted-foreground">Preencha e será redirecionado ao WhatsApp</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Nome *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">E-mail *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder="seu@email.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Telefone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className={inputClass} placeholder="(44) 99999-9999" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Cidade *</label>
                  <select name="city" value={formData.city} onChange={handleInputChange} required className={inputClass}>
                    <option value="">Selecione</option>
                    {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Mensagem</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className={`${inputClass} resize-none`} placeholder="Como podemos ajudar? (opcional)" />
              </div>
              <Button type="submit" className="w-full btn-premium" size="lg">
                Enviar via WhatsApp
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <div key={i} className="glass-card !p-5 flex items-start gap-4">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-1">{item.title}</h4>
                  {item.content}
                  {item.sub && <p className="text-xs text-primary mt-1 font-medium">{item.sub}</p>}
                </div>
              </div>
            ))}

            <div className="glass-card !p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-foreground mb-1">Instagram</h4>
                <a href="https://instagram.com/zuxinternet" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium text-sm">
                  @zuxinternet
                </a>
                <p className="text-xs text-muted-foreground mt-1">Siga para novidades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
