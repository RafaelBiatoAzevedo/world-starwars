import { describe, expect, it } from 'vitest';
import { categories, entities, getEntities, getEntity, getEntityUrl } from '../data/catalog';
import { filterEntities, formatValue, getFilterValue, getRelated, parseFavorites } from './catalog';

describe('integridade do catálogo', () => {
  it('mantém todas as seis categorias e identificadores únicos', () => {
    expect(categories).toHaveLength(6);
    expect(entities.length).toBe(260);
    expect(new Set(entities.map(entity => entity.key)).size).toBe(entities.length);
    for (const category of categories) expect(getEntities(category.id).length).toBeGreaterThan(0);
  });
  it('resolve todas as referências internas sem depender da rede', () => {
    const urls = new Set(entities.map(entity => String(entity.data.url).replace(/\/$/, '')));
    const relationFields = [
      'films',
      'homeworld',
      'residents',
      'characters',
      'people',
      'pilots',
      'planets',
      'species',
      'starships',
      'vehicles',
    ];
    for (const entity of entities) {
      expect(getEntity(entity.category, entity.id)).toBe(entity);
      expect(getEntityUrl(entity)).toBe(`/${entity.category}/${entity.id}`);
      for (const field of relationFields) {
        const value = entity.data[field];
        if (!value) continue;
        const references = Array.isArray(value) ? value : [String(value)];
        for (const reference of references)
          expect(urls.has(reference.replace(/\/$/, '')), `${entity.name}: ${reference}`).toBe(true);
      }
    }
  });
  it('conecta Luke a Tatooine e aos seus filmes', () => {
    const luke = getEntity('characters', '1')!;
    expect(getRelated(luke, 'homeworld').map(entity => entity.name)).toEqual(['Tatooine']);
    expect(getRelated(luke, 'films')).toHaveLength(4);
  });
});

describe('busca, filtros e ordenação', () => {
  it('busca sem diferenciar maiúsculas ou acentos e aceita o título original do filme', () => {
    expect(filterEntities(entities, { query: '  AMEACA  ' })[0].name).toBe('A Ameaça Fantasma');
    expect(filterEntities(entities, { query: 'A New Hope' })[0].name).toBe('Uma Nova Esperança');
    expect(filterEntities(entities, { query: 'zzzzzzzz' })).toEqual([]);
  });
  it('combina busca com filtro e preserva a ordem da fonte', () => {
    const source = getEntities('characters');
    const original = source.map(entity => entity.key);
    const results = filterEntities(source, { query: 'skywalker', filter: 'male', sort: 'desc' });
    expect(results.map(entity => entity.name)).toEqual(['Luke Skywalker', 'Anakin Skywalker']);
    expect(source.map(entity => entity.key)).toEqual(original);
  });
  it('distingue as trilogias usando o número do episódio', () => {
    expect(getFilterValue(getEntity('films', '4')!)).toBe('Trilogia prequela');
    expect(filterEntities(getEntities('films'), { filter: 'Trilogia original' })).toHaveLength(3);
  });
});

describe('formatação e persistência defensiva', () => {
  it('preserva valores zero e formata unidades e datas no português brasileiro', () => {
    expect(formatValue('0', '%')).toBe('0%');
    expect(formatValue('1,358', 'kg')).toBe('1.358 kg');
    expect(formatValue('unknown', 'km')).toBe('Desconhecido');
    expect(formatValue('n/a', 'm')).toBe('Não se aplica');
    expect(formatValue('1977-05-25')).toBe('25/05/1977');
    expect(formatValue('blue, red')).toBe('Azul, Vermelho');
  });
  it('recupera armazenamento corrompido, remove duplicados e descarta registros inválidos', () => {
    expect(parseFavorites('invalid')).toEqual([]);
    expect(parseFavorites('{}')).toEqual([]);
    expect(parseFavorites(null)).toEqual([]);
    expect(parseFavorites('["characters:1", "characters:1", "planets:9999", 5]')).toEqual([
      'characters:1',
    ]);
  });
});
