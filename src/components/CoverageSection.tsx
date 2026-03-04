import { useState, useEffect } from 'react';
import { MapPin, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const CoverageSection = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data, error } = await supabase
          .from('cities')
          .select('name, state')
          .eq('active', true)
          .order('name');

        if (error) { console.error('Error fetching cities:', error); return; }
        setCities(data.map(city => `${city.name} - ${city.state}`));
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const checkCoverage = () => {
    if (selectedCity) {
      window.location.assign(getWhatsAppUrl(`Olá! Gostaria de verificar a cobertura em ${selectedCity}`));
    }
  };

  return (
    <section id="cobertura" className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0"><div className="glow-line" /></div>

      <div className="container-premium">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Cobertura</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Internet Fibra Óptica em <span className="text-gradient">Campo Mourão</span> e Região
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Líder em internet fibra óptica em Campo Mourão, Luiziana, Barbosa Ferraz, 
            Corumbataí do Sul e Iretama.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="font-display text-xl font-bold text-foreground">
              Cidades Atendidas
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {loading ? (
                <div className="col-span-2 text-center text-muted-foreground py-8">Carregando cidades...</div>
              ) : cities.map((city, index) => (
                <button
                  key={index}
                  className={`glass-card !p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${
                    selectedCity === city ? 'ring-1 ring-primary border-primary/50' : ''
                  }`}
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{city}</span>
                    <div className="text-xs text-muted-foreground">Fibra óptica disponível</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="glass-card !p-5 border-l-2 border-l-primary">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-1">Expansão Contínua</h4>
                  <p className="text-xs text-muted-foreground">
                    Estamos constantemente expandindo nossa cobertura. Entre em contato para saber sobre futuros planos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Search className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Verificar Cobertura</h3>
              <p className="text-sm text-muted-foreground">Selecione sua cidade para verificar disponibilidade</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sua cidade:</label>
              <select 
                className="w-full p-3 rounded-xl bg-muted border border-border text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={loading}
              >
                <option value="">{loading ? "Carregando..." : "Escolha uma cidade..."}</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {selectedCity && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Check className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-sm font-semibold text-foreground">Cidade Atendida!</span>
                  <p className="text-xs text-muted-foreground">{selectedCity} possui cobertura Zux</p>
                </div>
              </div>
            )}

            <Button className="w-full btn-premium" size="lg" onClick={checkCoverage} disabled={!selectedCity}>
              Verificar Disponibilidade
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Ou entre em contato: <strong className="text-foreground">(44) 92004-9139</strong>
            </p>
          </div>
        </div>

        <div className="mt-16 glass-card">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Fibra Óptica</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-secondary mb-1">{cities.length}+</div>
              <div className="text-sm text-muted-foreground">Cidades</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">24h</div>
              <div className="text-sm text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
