-- Criar tabelas para o sistema CMS e gerenciamento de leads

-- Tabela para leads/contatos
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  plan_type TEXT, -- 'fibra', '5g', 'empresarial'
  plan_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'sem_viabilidade', 'desistiu', 'sem_contato', 'contratou')),
  source TEXT DEFAULT 'site',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para banners/slides do site
CREATE TABLE public.banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  active BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para planos de internet fibra
CREATE TABLE public.internet_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  speed TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  popular BOOLEAN DEFAULT false,
  features JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para planos móveis 5G
CREATE TABLE public.mobile_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  data_amount TEXT NOT NULL,
  minutes TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  popular BOOLEAN DEFAULT false,
  features JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para conteúdo do site (textos, imagens, etc)
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- 'hero', 'about', 'testimonials', etc
  content_key TEXT NOT NULL,
  content_value TEXT,
  content_type TEXT DEFAULT 'text', -- 'text', 'image', 'html'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, content_key)
);

-- Tabela para depoimentos
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_location TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mobile_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas para acesso público de leitura nos dados do site
CREATE POLICY "Allow public read access to banners" ON public.banners FOR SELECT USING (active = true);
CREATE POLICY "Allow public read access to internet plans" ON public.internet_plans FOR SELECT USING (active = true);
CREATE POLICY "Allow public read access to mobile plans" ON public.mobile_plans FOR SELECT USING (active = true);
CREATE POLICY "Allow public read access to site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials FOR SELECT USING (active = true);

-- Política para permitir inserção pública de leads (formulário de contato)
CREATE POLICY "Allow public insert to leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Função para atualizar timestamps automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at automaticamente
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON public.banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_internet_plans_updated_at BEFORE UPDATE ON public.internet_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mobile_plans_updated_at BEFORE UPDATE ON public.mobile_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados iniciais dos planos atuais
INSERT INTO public.internet_plans (name, speed, price, popular, features) VALUES
('Fibra 700 MB', '700 Mbps', 99.90, false, '["700 Mbps de velocidade", "Wi-Fi incluso", "Suporte 24h", "Instalação grátis", "Sem fidelidade"]'),
('Fibra 1 Giga', '1 Gbps', 149.90, true, '["1 Gbps de velocidade", "Wi-Fi 6 incluso", "Suporte prioritário 24h", "Instalação grátis", "Sem fidelidade", "IP fixo grátis"]');

INSERT INTO public.mobile_plans (name, data_amount, minutes, price, popular, features) VALUES
('5G Essencial', '6GB', '100 minutos', 39.90, false, '["6GB de internet móvel", "100 minutos para qualquer número", "Cobertura nacional", "Velocidade 5G", "Valor fixo sem reajuste"]'),
('5G Plus', '15GB', 'Ilimitado', 59.90, true, '["15GB de internet móvel", "Ligações ilimitadas", "Cobertura nacional + 70 países", "Velocidade 5G", "Valor fixo sem reajuste"]'),
('5G Pro', '30GB', 'Ilimitado', 79.90, false, '["30GB de internet móvel", "Ligações ilimitadas", "Cobertura nacional + 70 países", "Velocidade 5G premium", "Valor fixo sem reajuste"]'),
('5G Ultra', '45GB', 'Ilimitado', 99.90, false, '["45GB de internet móvel", "Ligações ilimitadas", "Cobertura nacional + 70 países", "Velocidade 5G premium", "Valor fixo sem reajuste"]');

-- Inserir conteúdo inicial do site
INSERT INTO public.site_content (section, content_key, content_value, content_type) VALUES
('hero', 'title', 'Conectando Você ao Extraordinário', 'text'),
('hero', 'subtitle', 'Internet fibra ótica de altíssima qualidade', 'text'),
('about', 'title', 'Por que escolher a Zux Internet?', 'text'),
('about', 'description', 'Somos especialistas em conectividade premium, oferecendo internet fibra ótica e serviços móveis 5G com a mais alta tecnologia do mercado.', 'text');

-- Inserir depoimentos iniciais
INSERT INTO public.testimonials (client_name, client_location, testimonial, rating) VALUES
('Maria Silva', 'Maringá-PR', 'A internet da Zux é realmente extraordinária! Velocidade incrível e suporte excepcional.', 5),
('João Santos', 'Apucarana-PR', 'Desde que contratei a Zux, nunca mais tive problemas de conexão. Recomendo!', 5),
('Ana Costa', 'Paiçandu-PR', 'Atendimento diferenciado e qualidade premium. Vale cada centavo!', 5);