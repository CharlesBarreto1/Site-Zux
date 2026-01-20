-- Remover cidades que não fazem mais parte da cobertura
DELETE FROM public.cities 
WHERE name IN (
  'Apucarana',
  'Arapongas',
  'Cambé',
  'Cornélio Procópio',
  'Ibiporã',
  'Londrina',
  'Rolândia'
) AND state = 'PR';

-- Adicionar Iretama - PR (se não existir)
INSERT INTO public.cities (name, state, active)
VALUES ('Iretama', 'PR', true)
ON CONFLICT DO NOTHING;