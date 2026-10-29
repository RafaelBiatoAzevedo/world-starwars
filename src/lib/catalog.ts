import { entities, getCategory, normalize } from '../data/catalog';
import type { Entity, SortOrder } from '../data/types';

const translations: Record<string, string> = {
  unknown: 'Desconhecido',
  'n/a': 'Não se aplica',
  none: 'Nenhum',
  male: 'Masculino',
  female: 'Feminino',
  hermaphrodite: 'Hermafrodita',
  arid: 'Árido',
  temperate: 'Temperado',
  tropical: 'Tropical',
  frozen: 'Gélido',
  murky: 'Nebuloso',
  hot: 'Quente',
  humid: 'Úmido',
  moist: 'Úmido',
  windy: 'Ventoso',
  polluted: 'Poluído',
  subartic: 'Subártico',
  frigid: 'Frio',
  artic: 'Ártico',
  artificial: 'Artificial',
  superheated: 'Superaquecido',
  desert: 'Deserto',
  grasslands: 'Pradarias',
  mountains: 'Montanhas',
  jungle: 'Selva',
  jungles: 'Selvas',
  rainforests: 'Florestas tropicais',
  tundra: 'Tundra',
  'ice caves': 'Cavernas de gelo',
  'mountain ranges': 'Cordilheiras',
  swamp: 'Pântano',
  swamps: 'Pântanos',
  forests: 'Florestas',
  forest: 'Floresta',
  lakes: 'Lagos',
  plains: 'Planícies',
  hills: 'Colinas',
  ocean: 'Oceano',
  oceans: 'Oceanos',
  gas: 'Gasoso',
  cityscape: 'Paisagem urbana',
  volcanoes: 'Vulcões',
  lava: 'Lava',
  'rock caves': 'Cavernas rochosas',
  'rock arches': 'Arcos rochosos',
  grass: 'Grama',
  glaciers: 'Geleiras',
  'barren rock': 'Rocha estéril',
  mammal: 'Mamífero',
  mammals: 'Mamíferos',
  reptile: 'Réptil',
  reptilian: 'Reptiliana',
  amphibian: 'Anfíbio',
  gastropod: 'Gastrópode',
  insectoid: 'Insetoide',
  sentient: 'Senciente',
  humanoid: 'Humanoide',
  'reptilian, amphibian': 'Reptiliana, anfíbia',
  brown: 'Castanho',
  blue: 'Azul',
  yellow: 'Amarelo',
  red: 'Vermelho',
  black: 'Preto',
  white: 'Branco',
  orange: 'Laranja',
  green: 'Verde',
  grey: 'Cinza',
  gray: 'Cinza',
  hazel: 'Avelã',
  fair: 'Clara',
  light: 'Clara',
  gold: 'Dourada',
  blond: 'Loiro',
  auburn: 'Ruivo',
  silver: 'Prateada',
  dark: 'Escura',
  pale: 'Pálida',
  pink: 'Rosa',
  purple: 'Roxa',
  tan: 'Bronzeada',
  blonde: 'Loiro',
  metallic: 'Metálico',
  'blue-gray': 'Azul-acinzentado',
  fighter: 'Caça',
  starfighter: 'Caça estelar',
  'light freighter': 'Cargueiro leve',
  'assault starfighter': 'Caça de assalto',
  'star dreadnought': 'Encouraçado estelar',
  'star destroyer': 'Destróier estelar',
  'deep space mobile battlestation': 'Estação de batalha',
  corvette: 'Corveta',
  frigate: 'Fragata',
  cruiser: 'Cruzador',
  shuttle: 'Transporte',
  'armed government transport': 'Transporte governamental armado',
  'landing craft': 'Nave de desembarque',
  'patrol craft': 'Nave de patrulha',
  transport: 'Transporte',
  wheeled: 'Sobre rodas',
  repulsorcraft: 'Repulsor',
  walker: 'Caminhante',
  airspeeder: 'Airspeeder',
  speeder: 'Speeder',
  'speeder bike': 'Moto speeder',
  'sail barge': 'Barcaça a vela',
  'repulsorcraft cargo skiff': 'Esquife de carga',
  'wheeled walker': 'Caminhante com rodas',
  'assault walker': 'Caminhante de assalto',
  submarine: 'Submarino',
  'space/planetary bomber': 'Bombardeiro espacial/planetário',
  'droid starfighter': 'Caça droide',
};

export function translate(value: string): string {
  const exact = translations[value.toLowerCase()];
  if (exact) return exact;
  return value
    .split(',')
    .map(part => translations[part.trim().toLowerCase()] || part.trim())
    .join(', ');
}

export function formatValue(value: string | number | string[] | undefined, unit?: string): string {
  if (value === undefined || value === '' || value === 'unknown') return 'Desconhecido';
  if (Array.isArray(value)) return value.length.toLocaleString('pt-BR');
  const text = String(value);
  if (text === 'n/a' || text === 'none') return translate(text);
  if (/^\d{4}-\d{2}-\d{2}$/.test(text))
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
      new Date(`${text}T12:00:00Z`),
    );
  const number = Number(text.replace(/,/g, ''));
  const formatted =
    text.trim() && Number.isFinite(number)
      ? number.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
      : translate(text);
  return unit ? `${formatted}${unit === '%' ? '' : ' '}${unit}` : formatted;
}

export function getFilterValue(entity: Entity): string {
  const category = getCategory(entity.category)!;
  if (category.filter === 'trilogy')
    return Number(entity.data.episode_id) <= 3 ? 'Trilogia prequela' : 'Trilogia original';
  return String(entity.data[category.filter] || 'unknown');
}

export function filterEntities(
  records: Entity[],
  {
    query = '',
    filter = '',
    sort = 'featured',
  }: { query?: string; filter?: string; sort?: SortOrder } = {},
) {
  const term = normalize(query.trim());
  const result = records.filter(entity => {
    const matchesText =
      !term ||
      normalize(`${entity.name} ${entity.originalName} ${entity.data.model || ''}`).includes(term);
    return matchesText && (!filter || getFilterValue(entity) === filter);
  });
  if (sort === 'asc' || sort === 'desc')
    result.sort(
      (a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', { numeric: true }) * (sort === 'asc' ? 1 : -1),
    );
  return result;
}

export function getRelated(entity: Entity, field: string): Entity[] {
  const urls = entity.data[field];
  if (!urls) return [];
  const references = (Array.isArray(urls) ? urls : [String(urls)]).map(url =>
    url.replace(/\/$/, ''),
  );
  return entities.filter(record => references.includes(String(record.data.url).replace(/\/$/, '')));
}

export function getSubtitle(entity: Entity): string {
  switch (entity.category) {
    case 'characters':
      return getRelated(entity, 'homeworld')[0]?.name || 'Origem desconhecida';
    case 'planets':
      return translate(String(entity.data.terrain));
    case 'films':
      return `Episódio ${['', 'I', 'II', 'III', 'IV', 'V', 'VI'][Number(entity.data.episode_id)]} · ${String(entity.data.release_date).slice(0, 4)}`;
    case 'species':
      return translate(String(entity.data.classification));
    case 'starships':
      return translate(String(entity.data.starship_class));
    case 'vehicles':
      return translate(String(entity.data.vehicle_class));
  }
}

export function parseFavorites(raw: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(raw || '[]');
    return Array.isArray(parsed)
      ? [
          ...new Set(
            parsed.filter(
              (key): key is string =>
                typeof key === 'string' && entities.some(entity => entity.key === key),
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}
