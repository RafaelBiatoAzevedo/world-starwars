import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  categories,
  entities,
  getAsset,
  getCategory,
  getEntities,
  getImage,
} from '../data/catalog';
import { filterEntities, getFilterValue, translate } from '../lib/catalog';
import { useCollection } from '../context/CollectionContext';
import { EntityCard } from '../components/EntityCard';
import { CategoryIcon } from '../components/CategoryIcon';
import { usePageTitle } from '../lib/usePageTitle';
import type { Category, Entity, SortOrder } from '../data/types';
import { NotFound } from './NotFound';

const PAGE_SIZE = 12;

export function CatalogPage() {
  const { category: id } = useParams();
  const category = getCategory(id);
  if (!category) return <NotFound />;
  return <Catalog key={category.id} category={category} records={getEntities(category.id)} />;
}

export function CollectionPage() {
  const { favorites } = useCollection();
  return <Catalog records={entities.filter(entity => favorites.includes(entity.key))} />;
}

function Catalog({ category, records }: { category?: Category; records: Entity[] }) {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const filter = params.get('filter') || '';
  const selectedCategory = params.get('category') || '';
  const sort = (
    ['asc', 'desc'].includes(params.get('sort') || '') ? params.get('sort') : 'featured'
  ) as SortOrder;
  const view = params.get('view') === 'list' ? 'list' : 'grid';
  const title = category?.name || 'Minha coleção';
  usePageTitle(title);
  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: key === 'q' });
  };
  const selectedRecords =
    !category && selectedCategory
      ? records.filter(record => record.category === selectedCategory)
      : records;
  const filtered = filterEntities(selectedRecords, { query, filter, sort });
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const parsedPage = Number(params.get('page') || 1);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? Math.min(pages, parsedPage) : 1;
  const visibleRecords = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const filterOptions = [...new Set(records.map(getFilterValue))].sort((a, b) =>
    translate(a).localeCompare(translate(b), 'pt-BR'),
  );
  const hasFilters = !!(query || filter || selectedCategory);
  const categoryImage =
    category?.id === 'films'
      ? getImage(records[1])
      : category
        ? getAsset(category.image)
        : undefined;
  const reset = () => setParams({});
  const changePage = (value: number) => {
    updateParam('page', String(value));
    document
      .getElementById('catalog-results')
      ?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  return (
    <>
      <section className={`catalog-hero ${!category ? 'collection-hero' : ''}`}>
        {categoryImage && <img className="catalog-hero-image" src={categoryImage} alt="" />}
        <div className="catalog-hero-shade" />
        <div className="container catalog-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Início</Link>
            <ChevronRight size={12} />
            <span>{title}</span>
          </div>
          <p className="eyebrow">
            {category ? (
              <>
                <CategoryIcon category={category.id} size={14} />
                ARQUIVOS DA GALÁXIA
              </>
            ) : (
              <>
                <Bookmark size={14} />
                SEU PRÓPRIO UNIVERSO
              </>
            )}
          </p>
          <h1>
            {title}
            <span className="yellow">.</span>
          </h1>
          <p className="catalog-description">
            {category?.description ||
              'As histórias, os mundos e as lendas que você quer guardar por perto.'}
          </p>
          <span className="catalog-total">
            <span className="status-dot" />
            {records.length} {category ? 'registros no arquivo' : `itens na sua coleção`}
          </span>
        </div>
      </section>
      <section className="container catalog-content" aria-label={`Explorar ${title.toLowerCase()}`}>
        {!category && records.length === 0 ? (
          <div className="empty-state collection-empty">
            <span className="empty-state-icon">
              <Bookmark size={36} strokeWidth={1.25} />
            </span>
            <p className="eyebrow">SUA JORNADA ESTÁ COMEÇANDO</p>
            <h2>
              Toda coleção começa
              <br />
              com uma descoberta.
            </h2>
            <p>
              Toque no marcador de qualquer registro para salvá-lo aqui.
              <br />
              Sua coleção fica guardada neste navegador.
            </p>
            <Link className="button button-primary" to="/characters">
              Encontrar minha primeira lenda
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <div className="catalog-toolbar">
              <div className="catalog-search">
                <Search size={19} />
                <input
                  type="search"
                  value={query}
                  onChange={event => updateParam('q', event.target.value)}
                  placeholder={`Buscar ${category?.name.toLowerCase() || 'na coleção'}…`}
                  aria-label={`Buscar ${category?.name.toLowerCase() || 'na coleção'}`}
                />
                {query && (
                  <button
                    className="icon-button"
                    onClick={() => updateParam('q', '')}
                    aria-label="Limpar busca"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
              <div className="catalog-filters">
                <SlidersHorizontal className="filter-symbol" size={17} />
                {category ? (
                  <select
                    aria-label={`Filtrar por ${category.filterLabel.toLowerCase()}`}
                    value={filter}
                    onChange={event => updateParam('filter', event.target.value)}
                  >
                    <option value="">{category.filterLabel}: todos</option>
                    {filterOptions.map(value => (
                      <option key={value} value={value}>
                        {translate(value)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    aria-label="Filtrar por categoria"
                    value={selectedCategory}
                    onChange={event => updateParam('category', event.target.value)}
                  >
                    <option value="">Todas as categorias</option>
                    {categories.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
                <select
                  aria-label="Ordenar registros"
                  value={sort}
                  onChange={event => updateParam('sort', event.target.value)}
                >
                  <option value="featured">Ordem do arquivo</option>
                  <option value="asc">Nome: A–Z</option>
                  <option value="desc">Nome: Z–A</option>
                </select>
              </div>
            </div>
            <div className="results-bar" id="catalog-results">
              <p role="status" aria-live="polite">
                <strong>{filtered.length}</strong>{' '}
                {filtered.length === 1 ? 'registro encontrado' : 'registros encontrados'}
                {query && <span> para “{query}”</span>}
              </p>
              <div className="results-actions">
                {hasFilters && (
                  <button className="reset-filters" onClick={reset}>
                    Limpar filtros
                    <X size={13} />
                  </button>
                )}
                <div className="view-switch" aria-label="Modo de visualização">
                  <button
                    onClick={() => updateParam('view', '')}
                    aria-label="Visualizar em cards"
                    aria-pressed={view === 'grid'}
                  >
                    <LayoutGrid size={17} />
                    {view === 'grid' && <Check className="sr-only" />}
                  </button>
                  <button
                    onClick={() => updateParam('view', 'list')}
                    aria-label="Visualizar em lista"
                    aria-pressed={view === 'list'}
                  >
                    <List size={19} />
                  </button>
                </div>
              </div>
            </div>
            {filtered.length ? (
              <>
                <div className={view === 'list' ? 'entity-list' : 'entity-grid'}>
                  {visibleRecords.map(entity => (
                    <EntityCard key={entity.key} entity={entity} />
                  ))}
                </div>
                <div className="pagination-bar">
                  <p>
                    Exibindo {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
                  </p>
                  {pages > 1 && (
                    <nav className="pagination" aria-label="Paginação do catálogo">
                      <button
                        aria-label="Página anterior"
                        disabled={page === 1}
                        onClick={() => changePage(page - 1)}
                      >
                        <ChevronLeft size={17} />
                      </button>
                      {Array.from({ length: pages }, (_, i) => i + 1)
                        .filter(
                          number =>
                            number === 1 || number === pages || Math.abs(number - page) <= 1,
                        )
                        .map((number, index, array) => (
                          <span key={number}>
                            {index > 0 && number - array[index - 1] > 1 && (
                              <span className="pagination-ellipsis">…</span>
                            )}
                            <button
                              aria-label={`Página ${number}`}
                              aria-current={number === page ? 'page' : undefined}
                              onClick={() => changePage(number)}
                            >
                              {number}
                            </button>
                          </span>
                        ))}
                      <button
                        aria-label="Próxima página"
                        disabled={page === pages}
                        onClick={() => changePage(page + 1)}
                      >
                        <ChevronRight size={17} />
                      </button>
                    </nav>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <span className="empty-state-icon">
                  <Search size={35} strokeWidth={1.3} />
                </span>
                <h2>Nenhum sinal por aqui.</h2>
                <p>Experimente outro nome ou ajuste os filtros para continuar explorando.</p>
                <button className="button button-secondary" onClick={reset}>
                  Limpar filtros
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
        <div className="catalog-note">
          <span className="tiny-cross">+</span>
          {category
            ? 'Cada registro é uma porta para outra história. Explore as conexões.'
            : 'Sua coleção é pessoal e fica salva neste navegador, sem precisar de uma conta.'}
        </div>
      </section>
    </>
  );
}
