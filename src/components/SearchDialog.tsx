import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { entities, getCategory, getEntityUrl } from '../data/catalog';
import { filterEntities } from '../lib/catalog';
import { CategoryIcon } from './CategoryIcon';

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog?.open) {
      dialog.close();
      setQuery('');
    }
  }, [open]);
  const results = filterEntities(entities, { query }).slice(0, 8);
  return (
    <dialog
      ref={ref}
      className="search-dialog"
      aria-labelledby="search-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-panel">
        <div className="search-dialog-heading">
          <span className="eyebrow" id="search-title">
            BUSQUE NA GALÁXIA
          </span>
          <button className="icon-button" onClick={onClose} aria-label="Fechar busca">
            <X size={20} />
          </button>
        </div>
        <div className="global-search-input">
          <Search size={23} />
          <input
            ref={inputRef}
            aria-label="Buscar em todas as categorias"
            placeholder="Personagens, planetas, naves…"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <kbd>ESC</kbd>
        </div>
        <p className="search-hint">
          {query.trim() ? 'Resultados encontrados' : 'Um bom lugar para começar'}
        </p>
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map(entity => (
              <Link key={entity.key} to={getEntityUrl(entity)} onClick={onClose}>
                <span className="search-result-icon">
                  <CategoryIcon category={entity.category} size={21} />
                </span>
                <span>
                  <strong>{entity.name}</strong>
                  <small>{getCategory(entity.category)!.name}</small>
                </span>
                <ArrowRight size={17} />
              </Link>
            ))
          ) : (
            <div className="search-empty">
              <Search size={30} />
              <h3>Nenhum sinal por aqui.</h3>
              <p>Tente outro nome, como “Skywalker” ou “Naboo”.</p>
            </div>
          )}
        </div>
        <div className="search-dialog-footer">
          <span>{entities.length} registros para descobrir</span>
          <span>A Força guia sua busca.</span>
        </div>
      </div>
    </dialog>
  );
}
