import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const cities = [
    'Maringá-PR', 'Paiçandu-PR', 'Astorga-PR', 'Jandaia do Sul-PR',
    'Apucarana-PR', 'Arapongas-PR', 'Floresta-PR', 'Cianorte-PR',
    'Campo Mourão-PR', 'Umuarama-PR', 'Barbosa Ferraz-PR', 'São Pedro do Ivaí-PR'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Olá! Gostaria de mais informações sobre os planos da Zux Internet.

*Dados de Contato:*
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Cidade: ${formData.city}

*Mensagem:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/5544311025300?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será redirecionado para nosso atendimento no WhatsApp.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      message: ''
    });
  };

  return (
    <section id="contato" className="section-premium bg-gradient-to-br from-gray-50 to-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Entre em <span className="text-red-500">Contato</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender você com excelência. 
            Entre em contato conosco e descubra como podemos conectar você ao extraordinário.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-black flex items-center space-x-3">
                <Send className="w-8 h-8 text-red-500" />
                <span>Fale Conosco</span>
              </CardTitle>
              <p className="text-gray-600">
                Preencha o formulário e entraremos em contato rapidamente
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="(44) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cidade *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    >
                      <option value="">Selecione sua cidade</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    placeholder="Como podemos ajudar você? (opcional)"
                  />
                </div>

                <Button type="submit" className="w-full btn-premium" size="lg">
                  Enviar via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-black">
              Informações de <span className="text-red-500">Contato</span>
            </h3>

            <div className="grid gap-6">
              {/* Phone */}
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Telefone</h4>
                  <a 
                    href="https://wa.me/5544311025300" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    (44) 3110-2530
                  </a>
                  <p className="text-gray-600 text-sm">WhatsApp disponível 24h</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">E-mail</h4>
                  <a 
                    href="mailto:contato@zux.net.br"
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    contato@zux.net.br
                  </a>
                  <p className="text-gray-600 text-sm">Resposta em até 24h</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Endereço</h4>
                  <p className="text-gray-700">
                    Alameda dos Pintados, 116 - Centro
                    <br />
                    Engenheiro Beltrão - PR
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Horário de Atendimento</h4>
                  <p className="text-gray-700">
                    Segunda a Sexta: 8h às 18h
                    <br />
                    Sábado: 8h às 12h
                  </p>
                  <p className="text-green-600 text-sm font-semibold">Suporte técnico 24h</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Redes Sociais</h4>
                  <a 
                    href="https://instagram.com/zuxinternet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    @zuxinternet
                  </a>
                  <p className="text-gray-600 text-sm">Siga para novidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;