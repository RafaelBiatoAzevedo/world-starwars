import snapshot from './snapshot.json';
import visualAssets from './images.json';
import type { Category, CategoryId, Entity, Resource } from './types';

export const categories: Category[] = [
  {
    id: 'characters',
    resource: 'people',
    name: 'Personagens',
    singular: 'Personagem',
    description:
      'Jedi, Sith, rebeldes e lendas. Conheça os rostos que mudaram o destino da galáxia.',
    tagline: 'Os rostos por trás das lendas',
    image: 'characters',
    filter: 'gender',
    filterLabel: 'Gênero',
    fields: [
      ['height', 'Altura', 'cm'],
      ['mass', 'Massa', 'kg'],
      ['birth_year', 'Nascimento'],
      ['gender', 'Gênero'],
      ['eye_color', 'Olhos'],
      ['hair_color', 'Cabelo'],
      ['skin_color', 'Pele'],
    ],
  },
  {
    id: 'planets',
    resource: 'planets',
    name: 'Planetas',
    singular: 'Planeta',
    description: 'Dos sóis de Tatooine às florestas de Endor. Cada mundo guarda uma nova história.',
    tagline: 'Novos mundos esperam por você',
    image: 'planets',
    filter: 'climate',
    filterLabel: 'Clima',
    fields: [
      ['climate', 'Clima'],
      ['terrain', 'Terreno'],
      ['population', 'População'],
      ['diameter', 'Diâmetro', 'km'],
      ['rotation_period', 'Rotação', 'h'],
      ['orbital_period', 'Órbita', 'dias'],
      ['gravity', 'Gravidade'],
      ['surface_water', 'Água na superfície', '%'],
    ],
  },
  {
    id: 'films',
    resource: 'films',
    name: 'Filmes',
    singular: 'Filme',
    description:
      'Reviva os seis episódios que deram origem à lenda. Uma saga que atravessa gerações.',
    tagline: 'A saga que marcou gerações',
    image: 'films',
    filter: 'trilogy',
    filterLabel: 'Trilogia',
    fields: [
      ['director', 'Direção'],
      ['producer', 'Produção'],
      ['release_date', 'Estreia'],
      ['episode_id', 'Episódio'],
    ],
  },
  {
    id: 'species',
    resource: 'species',
    name: 'Espécies',
    singular: 'Espécie',
    description:
      'Uma galáxia, incontáveis formas de vida. Descubra os povos e suas características.',
    tagline: 'A diversidade de uma galáxia',
    image: 'species',
    filter: 'classification',
    filterLabel: 'Classificação',
    fields: [
      ['classification', 'Classificação'],
      ['designation', 'Designação'],
      ['average_height', 'Altura média', 'cm'],
      ['average_lifespan', 'Expectativa de vida', 'anos'],
      ['language', 'Idioma'],
      ['skin_colors', 'Tons de pele'],
      ['eye_colors', 'Cores dos olhos'],
      ['hair_colors', 'Cores de cabelo'],
    ],
  },
  {
    id: 'starships',
    resource: 'starships',
    name: 'Naves',
    singular: 'Nave',
    description:
      'Prepare o hiperespaço. Explore as máquinas que conectam os cantos mais distantes do universo.',
    tagline: 'O próximo salto é seu',
    image: 'starships',
    filter: 'starship_class',
    filterLabel: 'Classe',
    fields: [
      ['model', 'Modelo'],
      ['manufacturer', 'Fabricante'],
      ['starship_class', 'Classe'],
      ['length', 'Comprimento', 'm'],
      ['crew', 'Tripulação'],
      ['passengers', 'Passageiros'],
      ['hyperdrive_rating', 'Hiperpropulsor'],
      ['MGLT', 'Velocidade', 'MGLT'],
      ['max_atmosphering_speed', 'Velocidade atmosférica', 'km/h'],
      ['cost_in_credits', 'Valor', 'créditos'],
      ['cargo_capacity', 'Carga', 'kg'],
    ],
  },
  {
    id: 'vehicles',
    resource: 'vehicles',
    name: 'Veículos',
    singular: 'Veículo',
    description:
      'Em terra, no ar ou sobre a neve de Hoth. Explore a engenharia que move as batalhas.',
    tagline: 'Muito além do hiperespaço',
    image: 'vehicles',
    filter: 'vehicle_class',
    filterLabel: 'Classe',
    fields: [
      ['model', 'Modelo'],
      ['manufacturer', 'Fabricante'],
      ['vehicle_class', 'Classe'],
      ['length', 'Comprimento', 'm'],
      ['crew', 'Tripulação'],
      ['passengers', 'Passageiros'],
      ['max_atmosphering_speed', 'Velocidade máxima', 'km/h'],
      ['cost_in_credits', 'Valor', 'créditos'],
      ['cargo_capacity', 'Carga', 'kg'],
      ['consumables', 'Autonomia'],
    ],
  },
];

const filmNames: Record<string, string> = {
  '1': 'Uma Nova Esperança',
  '2': 'O Império Contra-Ataca',
  '3': 'O Retorno de Jedi',
  '4': 'A Ameaça Fantasma',
  '5': 'Ataque dos Clones',
  '6': 'A Vingança dos Sith',
};
const characterImages = import.meta.glob<string>('../shared/assets/images/characters/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});
const filmImages = import.meta.glob<string>('../shared/assets/images/films/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});
export const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
const imageName = (value: string) => normalize(value).replace(/[^a-z0-9]/g, '');
const portraits = Object.fromEntries(
  Object.entries(characterImages).map(([path, url]) => [
    imageName(path.split('/').pop()!.split('.')[0]),
    url,
  ]),
);

export const entities: Entity[] = categories.flatMap(category => {
  const resources = snapshot.resources[category.resource] as Resource[];
  return resources.map(data => {
    const id = String(data.url).split('/').filter(Boolean).pop()!;
    const originalName = String(data.name || data.title);
    return {
      id,
      key: `${category.id}:${id}`,
      category: category.id,
      name: category.id === 'films' ? filmNames[id] || originalName : originalName,
      originalName,
      data,
    };
  });
});

export const getCategory = (id?: string) => categories.find(category => category.id === id);
export const getEntities = (category: CategoryId) =>
  entities.filter(entity => entity.category === category);
export const getEntity = (category: string, id: string) =>
  entities.find(entity => entity.category === category && entity.id === id);
export const getEntityUrl = (entity: Entity) => `/${entity.category}/${entity.id}`;
export const getAsset = (name: string): string | undefined =>
  (visualAssets as Record<string, string>)[name];
export function getImage(entity: Entity): string | undefined {
  if (entity.category === 'characters')
    return portraits[imageName(entity.originalName)] || getAsset(`people-${entity.id}`);
  if (entity.category === 'films')
    return Object.entries(filmImages).find(([path]) =>
      path.endsWith(`StarWars${entity.data.episode_id}.webp`),
    )?.[1];
  return getAsset(
    `${entity.category === 'planets' ? 'planet' : entity.category === 'starships' ? 'starship' : entity.category === 'vehicles' ? 'vehicle' : 'species'}-${entity.id}`,
  );
}

export const totalRecords = entities.length;
export const dataUpdatedAt = snapshot.updatedAt;
export const featuredKeys = ['characters:4', 'characters:1', 'characters:5', 'characters:10'];
export const featuredEntities = featuredKeys.map(key =>
  entities.find(entity => entity.key === key)!,
);

export const descriptions: Record<string, string> = {
  'films:1':
    'Uma mensagem escondida em um droide leva Luke Skywalker para muito além de Tatooine. Ao lado de novos aliados, ele encontra seu lugar na resistência contra o Império Galáctico.',
  'films:2':
    'A Aliança Rebelde é perseguida pelas forças imperiais, enquanto Luke busca compreender a Força com o Mestre Yoda. A sombra de Darth Vader se aproxima, trazendo uma revelação que muda tudo.',
  'films:3':
    'A batalha decisiva contra o Império se aproxima. Entre a missão em Endor e o confronto com o Imperador, Luke precisa acreditar que ainda existe um caminho de volta para seu pai.',
  'films:4':
    'Uma disputa em Naboo revela tensões que alcançam toda a República. Dois Jedi encontram em Tatooine um garoto com uma ligação extraordinária com a Força, enquanto os Sith voltam a agir.',
  'films:5':
    'Uma tentativa de assassinato coloca os Jedi diante de uma conspiração. Enquanto Obi-Wan investiga a origem de um exército de clones, Anakin e Padmé se aproximam em meio ao início de uma guerra.',
  'films:6':
    'As Guerras Clônicas chegam ao fim e a República enfrenta sua maior transformação. Dividido entre o medo de perder quem ama e o compromisso com os Jedi, Anakin se aproxima do lado sombrio.',
  'characters:2':
    'Fluente em milhões de formas de comunicação, C-3PO atravessa crises diplomáticas e batalhas ao lado de seu inseparável parceiro R2-D2.',
  'characters:3':
    'Pequeno no tamanho e imenso na coragem. O astromecânico R2-D2 acompanha gerações de heróis e carrega algumas das informações mais importantes da galáxia.',
  'characters:13':
    'Copiloto da Millennium Falcon e companheiro de Han Solo, Chewbacca é um guerreiro Wookiee cuja força só se compara à lealdade aos amigos.',
  'characters:14':
    'Contrabandista, piloto e dono de uma sorte difícil de explicar. Han Solo acaba encontrando na Aliança Rebelde uma causa maior do que seus próprios interesses.',
  'characters:20':
    'Séculos de estudo e uma profunda conexão com a Força fazem de Yoda um dos mais respeitados mestres Jedi. Seus ensinamentos acompanham Luke nos momentos decisivos de sua jornada.',
  'characters:22':
    'Caçador de recompensas conhecido por sua armadura mandaloriana, Boba Fett persegue alvos pelos cantos mais perigosos da galáxia.',
  'planets:4':
    'Coberto por neve e gelo, Hoth abriga a Base Echo da Aliança Rebelde. Seu clima extremo transforma qualquer missão em uma luta pela sobrevivência.',
  'planets:8':
    'Planícies, lagos e cidades elegantes marcam a paisagem de Naboo. Humanos e Gungans dividem um mundo que ocupa um lugar central nos últimos anos da República.',
  'planets:9':
    'Uma metrópole que se estende por um planeta inteiro. Coruscant é o centro político da República e o lar do Templo Jedi antes da ascensão do Império.',
  'characters:1':
    'Um jovem de Tatooine, um chamado da Força e uma jornada que mudaria a galáxia. Luke Skywalker se torna uma das grandes esperanças da Aliança Rebelde.',
  'characters:4':
    'Sob a armadura negra de Darth Vader vive a história de Anakin Skywalker. O temido Lorde Sith é uma das figuras centrais do conflito entre o Império e a Aliança Rebelde.',
  'characters:5':
    'Princesa de Alderaan e líder da Aliança Rebelde, Leia Organa enfrenta o Império com coragem, inteligência e uma determinação inabalável.',
  'characters:10':
    'Mestre Jedi e mentor de duas gerações de Skywalkers. A sabedoria de Obi-Wan Kenobi ecoa muito além de sua vida em Tatooine.',
  'planets:1':
    'Um mundo desértico sob dois sóis, na Orla Exterior. Longe dos grandes centros da galáxia, Tatooine é o ponto de partida de histórias extraordinárias.',
  'starships:10':
    'Pode não parecer grande coisa, mas a Millennium Falcon conquistou seu lugar na história. O cargueiro corelliano de Han Solo é um símbolo da luta rebelde.',
};
