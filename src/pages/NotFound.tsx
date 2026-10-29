import { ArrowLeft, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle';
export function NotFound() {
  usePageTitle('Coordenadas não encontradas');
  return (
    <div className="container not-found empty-state">
      <Orbit size={65} strokeWidth={1} />
      <p className="eyebrow">ERRO DE NAVEGAÇÃO · 404</p>
      <h1>
        Essas coordenadas
        <br />
        não estão no mapa.
      </h1>
      <p>
        Até os melhores pilotos erram um salto.
        <br />
        Volte ao início para encontrar um novo destino.
      </p>
      <Link className="button button-primary" to="/">
        <ArrowLeft size={18} />
        Voltar à galáxia
      </Link>
    </div>
  );
}
