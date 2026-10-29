import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Database,
  Link2,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { dataUpdatedAt, descriptions, getCategory, getEntity, getEntityUrl } from '../data/catalog';
import { formatValue, getRelated, getSubtitle } from '../lib/catalog';
import { EntityVisual, FavoriteButton } from '../components/EntityCard';
import { CategoryIcon } from '../components/CategoryIcon';
import { usePageTitle } from '../lib/usePageTitle';
import type { Entity } from '../data/types';
import { NotFound } from './NotFound';

const relationshipFields = [
  ['films', 'Aparições nos filmes'],
  ['homeworld', 'Planeta de origem'],
  ['residents', 'Habitantes conhecidos'],
  ['characters', 'Personagens'],
  ['people', 'Personagens desta espécie'],
  ['pilots', 'Pilotos'],
  ['planets', 'Planetas'],
  ['species', 'Espécies'],
  ['starships', 'Naves'],
  ['vehicles', 'Veículos'],
];

export function DetailPage() {
  const { category = '', id = '' } = useParams();
  const entity = getEntity(category, id);
  if (!entity) return <NotFound />;
  return <Detail key={entity.key} entity={entity} />;
}

function Detail({ entity }: { entity: Entity }) {
  const category = getCategory(entity.category)!;
  const connections = relationshipFields
    .map(([field, title]) => ({ field, title, records: getRelated(entity, field) }))
    .filter(group => group.records.length);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  usePageTitle(entity.name);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <div className="container detail-page">
      <div className="breadcrumb">
        <Link to="/">Início</Link>
        <ChevronRight size={12} />
        <Link to={`/${category.id}`}>{category.name}</Link>
        <ChevronRight size={12} />
        <span>{entity.name}</span>
      </div>
      <Link className="detail-back text-link" to={`/${category.id}`}>
        <ArrowLeft size={16} />
        Explorar {category.name.toLowerCase()}
      </Link>
      <section className="detail-layout">
        <div className={`detail-artwork detail-artwork-${entity.category}`}>
          <EntityVisual entity={entity} eager />
          <div className="detail-artwork-caption">
            <CategoryIcon category={entity.category} size={18} />
            <span>ARQUIVO GALÁCTICO</span>
            <span>#{entity.id.padStart(3, '0')}</span>
          </div>
        </div>
        <div className="detail-content">
          <p className="eyebrow">
            <CategoryIcon category={entity.category} size={15} />
            {category.singular.toUpperCase()}
            <span className="eyebrow-separator">/</span>REGISTRO {entity.id.padStart(3, '0')}
          </p>
          <h1>
            {entity.name}
            <span className="yellow">.</span>
          </h1>
          <p className="detail-subtitle">{getSubtitle(entity)}</p>
          {descriptions[entity.key] && (
            <p className="detail-description">{descriptions[entity.key]}</p>
          )}
          {entity.category === 'films' && (
            <p className="film-original-title">Título original: {entity.originalName}</p>
          )}
          <div className="detail-actions">
            <FavoriteButton entity={entity} withText />
            <button
              className="icon-button share-button"
              onClick={share}
              aria-label="Copiar link deste registro"
              title="Copiar link"
            >
              <Link2 size={19} />
            </button>
            <span className={`copy-status ${copyError ? 'copy-error' : ''}`} role="status">
              {copyError
                ? 'Copie o endereço pela barra do navegador.'
                : copied
                  ? 'Link copiado!'
                  : ''}
            </span>
          </div>
          <div className="spec-heading">
            <span className="eyebrow">DADOS DO ARQUIVO</span>
            <Database size={15} />
          </div>
          <dl className="spec-grid">
            {category.fields.map(([field, label, unit]) => (
              <div key={field}>
                <dt>{label}</dt>
                <dd>{formatValue(entity.data[field], unit)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      {entity.category === 'characters' && entity.data.birth_year !== 'unknown' && (
        <p className="detail-data-note">
          BBY: antes da Batalha de Yavin. ABY: depois da Batalha de Yavin.
        </p>
      )}
      {connections.length > 0 && (
        <section className="connections-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NENHUMA HISTÓRIA EXISTE SOZINHA</p>
              <h2>
                Conexões na galáxia<span className="yellow">.</span>
              </h2>
            </div>
            <span className="connections-count">
              <Link2 size={16} />
              {connections.reduce((sum, group) => sum + group.records.length, 0)} conexões
            </span>
          </div>
          <div className="connection-groups">
            {connections.map(group => (
              <RelatedGroup key={group.field} title={group.title} records={group.records} />
            ))}
          </div>
        </section>
      )}
      <div className="detail-source">
        <div>
          <Database size={16} />
          <span>
            Dados de{' '}
            <a href={String(entity.data.url)} target="_blank" rel="noreferrer">
              SWAPI
              <ArrowUpRight size={12} />
            </a>{' '}
            · Catálogo atualizado em{' '}
            {new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(
              new Date(dataUpdatedAt),
            )}
          </span>
        </div>
        <Link className="text-link" to={`/${category.id}`}>
          Continuar explorando
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function RelatedGroup({ title, records }: { title: string; records: Entity[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? records : records.slice(0, 8);
  return (
    <div className="related-group">
      <h3>
        {title}
        <span>{records.length}</span>
      </h3>
      <div className="related-grid">
        {visible.map(record => (
          <Link key={record.key} to={getEntityUrl(record)} className="related-item">
            <div className="related-image">
              <EntityVisual entity={record} />
            </div>
            <span>
              <strong>{record.name}</strong>
              <small>{getSubtitle(record)}</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>
      {records.length > 8 && (
        <button className="related-expand text-link" onClick={() => setExpanded(value => !value)}>
          {expanded ? 'Mostrar menos' : `Ver todos os ${records.length} registros`}
          <ChevronDown size={15} className={expanded ? 'rotate-180' : ''} />
        </button>
      )}
    </div>
  );
}
