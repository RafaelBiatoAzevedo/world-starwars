import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  MoveUpRight,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  categories,
  entities,
  featuredEntities,
  getAsset,
  getEntities,
  getEntityUrl,
  getImage,
  totalRecords,
} from '../data/catalog';
import { CategoryIcon } from '../components/CategoryIcon';
import { EntityCard } from '../components/EntityCard';
import { usePageTitle } from '../lib/usePageTitle';

export function Home() {
  usePageTitle('Explore a galáxia');
  const navigate = useNavigate();
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src={getAsset('hero')}
          alt="Darth Vader, envolto em sombras e iluminado por um reflexo vermelho"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-text">
            <p className="eyebrow">
              <span className="status-dot" />
              SEU PORTAL PARA UMA GALÁXIA DISTANTE
            </p>
            <h1 id="hero-title">
              UMA GALÁXIA.
              <br />
              INFINITAS
              <br />
              <span>HISTÓRIAS.</span>
            </h1>
            <p className="hero-description">
              Todo herói tem uma origem. Todo planeta, um segredo.
              <br className="desktop-break" /> Explore o universo Star Wars, uma descoberta de cada
              vez.
            </p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#explore">
                <Compass size={18} />
                Explorar a galáxia
                <ArrowUpRight size={18} />
              </a>
              <button
                className="button button-ghost"
                onClick={() =>
                  navigate(getEntityUrl(entities[Math.floor(Math.random() * entities.length)]))
                }
              >
                <Shuffle size={17} />
                Surpreenda-me
              </button>
            </div>
            <div className="hero-footnote">
              <span className="tiny-cross">+</span>UM UNIVERSO DE POSSIBILIDADES. O PRÓXIMO SALTO É
              SEU.
            </div>
          </div>
        </div>
        <Link className="hero-caption" to="/characters/4">
          <span className="caption-line" />
          <span>
            EM DESTAQUE
            <strong>
              DARTH VADER <MoveUpRight size={15} />
            </strong>
            <small>O poder do lado sombrio.</small>
          </span>
        </Link>
        <div className="container hero-bottom">
          <a href="#explore">
            <span className="scroll-icon">
              <ArrowDown size={15} />
            </span>
            ROLE PARA DESCOBRIR
          </a>
          <span>
            ARQUIVOS DA GALÁXIA<span className="hero-bottom-dot">/</span>VOL. 001 — VI
          </span>
        </div>
      </section>
      <div className="universe-stats">
        <div className="container stats-inner">
          <span className="stats-label">
            <span className="status-dot" />
            UMA GALÁXIA DE CONHECIMENTO
          </span>
          <div>
            <strong>{totalRecords}</strong>
            <span>registros para explorar</span>
          </div>
          <div>
            <strong>06</strong>
            <span>categorias do universo</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>novas descobertas</span>
          </div>
        </div>
      </div>
      <section
        id="explore"
        className="container section explore-section"
        aria-labelledby="explore-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">ESCOLHA SEU DESTINO</p>
            <h2 id="explore-title">
              O universo é só o começo<span className="yellow">.</span>
            </h2>
          </div>
          <p>
            De mundos distantes a personagens inesquecíveis.
            <br />
            Por onde sua jornada começa?
          </p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              className={`category-card category-${category.id}`}
              key={category.id}
              to={`/${category.id}`}
            >
              <img
                src={
                  category.id === 'films'
                    ? getImage(entities.find(entity => entity.key === 'films:2')!)
                    : getAsset(category.image)
                }
                alt=""
                loading="lazy"
              />
              <div className="category-card-shade" />
              <div className="category-top">
                <span className="category-icon">
                  <CategoryIcon category={category.id} size={22} />
                </span>
                <span className="category-index">0{index + 1} / 06</span>
              </div>
              <div className="category-bottom">
                <div>
                  <span className="category-count">
                    {getEntities(category.id).length} REGISTROS
                  </span>
                  <h3>{category.name}</h3>
                  <p>{category.tagline}</p>
                </div>
                <span className="category-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <Sparkles size={13} />
                PRESENÇAS QUE MARCARAM A SAGA
              </p>
              <h2>
                Lendas de uma galáxia distante<span className="yellow">.</span>
              </h2>
            </div>
            <Link className="text-link" to="/characters">
              Todos os personagens
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="entity-grid">
            {featuredEntities.map(entity => (
              <EntityCard key={entity.key} entity={entity} />
            ))}
          </div>
        </div>
      </section>
      <section className="container quote-section">
        <div className="quote-symbol" aria-hidden="true">
          “
        </div>
        <div>
          <p className="eyebrow">UM LEMBRETE PARA A JORNADA</p>
          <blockquote>
            Faça. Ou não faça.
            <br />
            <span>Tentativa não há.</span>
          </blockquote>
          <p className="quote-credit">
            <span />
            MESTRE YODA<span className="quote-film">O Império Contra-Ataca · 1980</span>
          </p>
        </div>
        <div className="quote-orbit" aria-hidden="true">
          <div />
          <span>THE FORCE</span>
          <Sparkles size={30} />
        </div>
        <Link
          to="/films/2"
          className="quote-link icon-button"
          aria-label="Explorar O Império Contra-Ataca"
        >
          <ArrowUpRight size={24} />
        </Link>
      </section>
    </>
  );
}
