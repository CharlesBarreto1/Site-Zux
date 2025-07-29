import { ArrowRight, Wifi, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-400/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Conectando</span>
                <br />
                <span className="text-hero">Você ao</span>
                <br />
                <span className="text-red-500">Extraordinário!</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Internet fibra ótica de altíssima qualidade para quem não aceita menos que a perfeição. 
                Tecnologia premium, velocidade incomparável e suporte diferenciado.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Até 1 Giga</h3>
                  <p className="text-gray-400 text-sm">Velocidade máxima</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Fibra Ótica</h3>
                  <p className="text-gray-400 text-sm">Tecnologia avançada</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Suporte 24h</h3>
                  <p className="text-gray-400 text-sm">Atendimento premium</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-premium group"
                onClick={() => {
                  const plansSection = document.getElementById('planos');
                  if (plansSection) {
                    plansSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ver Planos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-premium"
                onClick={() => window.open('https://wa.me/554431102530', '_blank')}
              >
                Falar no WhatsApp
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12+</div>
                <div className="text-gray-400 text-sm">Cidades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5000+</div>
                <div className="text-gray-400 text-sm">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Glowing Circle */}
              <div className="w-96 h-96 rounded-full bg-gradient-to-r from-red-500/20 to-yellow-400/20 animate-pulse"></div>
              
              {/* Inner Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
                    <Wifi className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-white">
                    <div className="text-4xl font-bold">1 GB</div>
                    <div className="text-gray-400">Velocidade máxima</div>
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;