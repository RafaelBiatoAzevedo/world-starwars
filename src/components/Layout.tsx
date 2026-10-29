import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, Menu, Search, Sparkles, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { categories } from '../data/catalog';
import { useCollection } from '../context/CollectionContext';
import { SearchDialog } from './SearchDialog';

export function Wordmark() {
  return (
    <span className="brand">
      <span className="brand-starwars" aria-hidden="true">
        STAR
        <br />
        WARS
      </span>
      <span className="brand-divider" />
      <span className="brand-world">
        WORLD
        <br />
        <small>EXPLORE A GALÁXIA</small>
      </span>
    </span>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { favorites, storageError } = useCollection();
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(open => !open);
      }
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand-link" to="/" aria-label="World Star Wars — início">
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <NavLink to="/" end>
              Início
            </NavLink>
            {categories.map(category => (
              <NavLink key={category.id} to={`/${category.id}`}>
                {category.name}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button header-search"
              aria-label="Abrir busca global"
              title="Buscar (Ctrl+K)"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} />
            </button>
            <span className="action-divider" />
            <NavLink
              to="/collection"
              className="collection-link"
              aria-label={`Minha coleção, ${favorites.length} itens`}
            >
              <Bookmark size={18} />
              <span>Minha coleção</span>
              {favorites.length > 0 && <span className="collection-count">{favorites.length}</span>}
            </NavLink>
            <button
              ref={menuButton}
              className="icon-button mobile-menu-button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" id="mobile-menu" aria-label="Navegação móvel">
            <NavLink to="/" end>
              Início
              <ArrowUpRight size={16} />
            </NavLink>
            {categories.map(category => (
              <NavLink key={category.id} to={`/${category.id}`}>
                {category.name}
                <ArrowUpRight size={16} />
              </NavLink>
            ))}
            <NavLink to="/collection">
              Minha coleção
              <Bookmark size={16} />
            </NavLink>
          </nav>
        )}
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      {storageError && (
        <div className="storage-notice" role="status">
          Seu navegador bloqueou o armazenamento. A coleção ficará disponível apenas nesta visita.
        </div>
      )}
      <footer className="site-footer">
        <div className="container footer-top">
          <Link to="/" className="brand-link" aria-label="Voltar ao início">
            <Wordmark />
          </Link>
          <p>
            Feito por quem acredita que
            <br />
            <strong>a galáxia sempre tem mais para explorar.</strong>
          </p>
          <a className="footer-force" href="#main">
            Que a Força esteja com você.
            <Sparkles size={17} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Azevedo Digital · Projeto de fã, sem fins comerciais.
          </span>
          <span>
            Star Wars © Lucasfilm Ltd.<span className="footer-dot">·</span>Dados:{' '}
            <a href="https://swapi.info" target="_blank" rel="noreferrer">
              SWAPI <ArrowUpRight size={11} />
            </a>
            <span className="footer-dot">·</span>
            <a href="/images/credits.json" target="_blank" rel="noreferrer">
              Créditos das imagens <ArrowUpRight size={11} />
            </a>
          </span>
        </div>
      </footer>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
