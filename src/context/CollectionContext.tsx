import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { parseFavorites } from '../lib/catalog';

const STORAGE_KEY = 'world-starwars:favorites:v1';
const CollectionContext = createContext<{
  favorites: string[];
  toggleFavorite: (key: string) => void;
  storageError: boolean;
} | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return parseFavorites(localStorage.getItem(STORAGE_KEY));
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [favorites]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null)
        setFavorites(parseFavorites(event.newValue));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const toggleFavorite = useCallback((key: string) => {
    setFavorites(current =>
      current.includes(key) ? current.filter(item => item !== key) : [...current, key],
    );
  }, []);
  const value = useMemo(
    () => ({ favorites, toggleFavorite, storageError }),
    [favorites, toggleFavorite, storageError],
  );
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error('CollectionProvider ausente.');
  return context;
}
