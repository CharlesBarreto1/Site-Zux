-- Atualizar preços dos planos para corresponder aos valores do site
UPDATE public.internet_plans 
SET price = 129.90, 
    name = 'Zux Pro',
    features = '["700 Mbps de velocidade", "Wi-Fi 6 incluso", "Suporte técnico 24h", "Instalação gratuita"]'::jsonb
WHERE name = 'Fibra 700 MB';

UPDATE public.internet_plans 
SET price = 159.90, 
    name = 'Zux Ultra',
    speed = '1 Giga',
    features = '["1 Giga de velocidade", "Wi-Fi 6E Premium", "Suporte VIP 24h", "Instalação premium gratuita"]'::jsonb
WHERE name = 'Fibra 1 Giga';