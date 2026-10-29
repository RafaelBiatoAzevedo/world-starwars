import { useState } from 'react';
import { ArrowUpRight, Bookmark, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategory, getEntityUrl, getImage } from '../data/catalog';
import { getSubtitle } from '../lib/catalog';
import type { Entity } from '../data/types';
import { useCollection } from '../context/CollectionContext';
import { CategoryIcon } from './CategoryIcon';

export function EntityVisual({
  entity,
  className = '',
  eager = false,
}: {
  entity: Entity;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const image = getImage(entity);
  return image && !failed ? (
    <img
      className={className}
      src={image}
      alt={entity.name}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  ) : (
    <div className={`visual-fallback ${className}`}>
      <div className="fallback-orbit" aria-hidden="true" />
      <CategoryIcon category={entity.category} size={58} />
      <span>ARQUIVO {String(entity.id).padStart(3, '0')}</span>
    </div>
  );
}

export function FavoriteButton({
  entity,
  withText = false,
}: {
  entity: Entity;
  withText?: boolean;
}) {
  const { favorites, toggleFavorite } = useCollection();
  const saved = favorites.includes(entity.key);
  return (
    <button
      className={`favorite-button ${saved ? 'is-saved' : ''} ${withText ? 'with-text button button-secondary' : 'icon-button'}`}
      onClick={() => toggleFavorite(entity.key)}
      aria-pressed={saved}
      aria-label={`${saved ? 'Remover' : 'Adicionar'} ${entity.name} ${saved ? 'da' : 'à'} coleção`}
    >
      {saved && withText ? (
        <Check size={18} />
      ) : (
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      )}
      {withText && (saved ? 'Salvo na coleção' : 'Salvar na coleção')}
    </button>
  );
}

export function EntityCard({ entity }: { entity: Entity }) {
  const category = getCategory(entity.category)!;
  return (
    <article className={`entity-card entity-${entity.category}`}>
      <Link className="entity-card-link" to={getEntityUrl(entity)}>
        <div className="entity-image">
          <EntityVisual entity={entity} />
          <span className="entity-category">
            <CategoryIcon category={entity.category} size={12} />
            {category.singular}
          </span>
        </div>
        <div className="entity-info">
          <span className="entity-id">
            {entity.category === 'films'
              ? 'ARQUIVO CINEMATOGRÁFICO'
              : `REGISTRO ${entity.id.padStart(3, '0')}`}
          </span>
          <h3>{entity.name}</h3>
          <p>{getSubtitle(entity)}</p>
          <ArrowUpRight className="entity-arrow" size={19} aria-hidden="true" />
        </div>
      </Link>
      <FavoriteButton entity={entity} />
    </article>
  );
}
