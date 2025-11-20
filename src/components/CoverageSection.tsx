import { useState, useEffect } from 'react';
import { MapPin, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

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

        if (error) {
          console.error('Error fetching cities:', error);
          return;
        }

        const formattedCities = data.map(city => `${city.name} - ${city.state}`);
        setCities(formattedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const checkCoverage = () => {
    if (selectedCity) {
      window.open(`https://wa.me/554431102530?text=Olá! Gostaria de verificar a cobertura em ${selectedCity}`, '_blank');
    }
  };

  return (
    <section id="cobertura" className="section-premium bg-gradient-to-br from-gray-50 to-white">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Internet Fibra Óptica em <span className="text-red-500">Campo Mourão</span> e Região
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            A Zux Internet é líder em internet fibra óptica em Campo Mourão, Luiziana, Barbosa Ferraz, 
            Corumbataí do Sul e Iretama, levando WiFi 5G de alta qualidade para milhares de famílias e empresas.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            Melhor internet • Melhor WiFi • Melhor atendimento • Instalação grátis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cities Grid */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-black text-center lg:text-left">
              Cidades com Internet Fibra Óptica Zux
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                <div className="col-span-2 text-center text-gray-500">Carregando cidades...</div>
              ) : cities.map((city, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-500/20"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">{city}</span>
                    <div className="text-sm text-gray-500">Internet fibra óptica disponível</div>
                  </div>
                 </div>
               ))}
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-yellow-400/10 p-6 rounded-xl border border-red-500/20">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-black mb-2">Expansão Contínua</h4>
                  <p className="text-gray-600">
                    Estamos constantemente expandindo nossa cobertura. 
                    Se sua cidade não está na lista, entre em contato conosco para saber sobre futuros planos de expansão.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Checker */}
          <Card className="card-premium">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-black flex items-center justify-center space-x-3">
                <Search className="w-8 h-8 text-red-500" />
                <span>Verificar Cobertura</span>
              </CardTitle>
              <p className="text-gray-600">
                Selecione sua cidade para verificar a disponibilidade em seu endereço
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Selecione sua cidade:
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-6 h-6 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-green-800">Cidade Atendida!</h4>
                      <p className="text-green-600 text-sm">
                        {selectedCity} possui cobertura da Zux Internet
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                className="w-full btn-premium"
                size="lg"
                onClick={checkCoverage}
                disabled={!selectedCity}
              >
                Verificar Disponibilidade no Endereço
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>
                  Ou entre em contato diretamente:
                  <br />
                  <strong>(44) 3110-2530</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-black rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
              <div className="text-gray-300">Fibra Ótica</div>
              <div className="text-sm text-gray-400 mt-1">Tecnologia pura</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{cities.length}+</div>
              <div className="text-gray-300">Cidades</div>
              <div className="text-sm text-gray-400 mt-1">Em expansão</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">24h</div>
              <div className="text-gray-300">Suporte</div>
              <div className="text-sm text-gray-400 mt-1">Sempre disponível</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;