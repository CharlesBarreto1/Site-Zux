// Cidades atendidas pela Zux Internet
// Para adicionar/remover cidades, edite este arquivo.
export const CITIES: { name: string; state: string }[] = [
  { name: 'Maringá', state: 'PR' },
  { name: 'Paiçandu', state: 'PR' },
  { name: 'Astorga', state: 'PR' },
  { name: 'Jandaia do Sul', state: 'PR' },
  { name: 'Apucarana', state: 'PR' },
  { name: 'Arapongas', state: 'PR' },
  { name: 'Floresta', state: 'PR' },
  { name: 'Cianorte', state: 'PR' },
  { name: 'Campo Mourão', state: 'PR' },
  { name: 'Umuarama', state: 'PR' },
  { name: 'Barbosa Ferraz', state: 'PR' },
  { name: 'São Pedro do Ivaí', state: 'PR' },
  { name: 'Luiziana', state: 'PR' },
  { name: 'Corumbataí do Sul', state: 'PR' },
  { name: 'Iretama', state: 'PR' },
];

// Strings formatadas: "Cidade-UF" (usadas em selects e botões)
export const CITY_LABELS: string[] = CITIES.map((c) => `${c.name}-${c.state}`);
