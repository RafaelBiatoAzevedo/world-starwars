import { Component, type ErrorInfo, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CollectionProvider } from './context/CollectionContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CatalogPage, CollectionPage } from './pages/Catalog';
import { DetailPage } from './pages/Detail';
import { NotFound } from './pages/NotFound';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Falha na navegação galáctica:', error, info.componentStack);
  }
  render() {
    if (this.state.hasError)
      return (
        <main className="empty-state not-found">
          <p className="eyebrow">TRANSMISSÃO INTERROMPIDA</p>
          <h1>Vamos tentar outro salto?</h1>
          <p>Não foi possível abrir este arquivo agora.</p>
          <a className="button button-primary" href="/">
            Voltar ao início
          </a>
        </main>
      );
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CollectionProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="collection" element={<CollectionPage />} />
              <Route path=":category" element={<CatalogPage />} />
              <Route path=":category/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CollectionProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
