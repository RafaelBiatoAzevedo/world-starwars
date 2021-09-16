import { FC, createContext, useContext, useEffect, useState } from 'react';
import { requestFilms } from '../services/planetsAPI';
import TFilm from '../types/TFilm';
import TFilmsContext from '../types/TFilmsContext';

const FilmsContext = createContext<TFilmsContext>({} as TFilmsContext);

const FilmsProvider: FC = ({ children }) => {
  const [films, setFilms] = useState<TFilm[]>([]);

  useEffect(() => {
    requestFilms().then((response) => setFilms(response.results));
  }, []);

  return (
    <FilmsContext.Provider value={{ films }}>{children}</FilmsContext.Provider>
  );
};

const useFilms = () => {
  return useContext(FilmsContext);
};

export { FilmsProvider, useFilms };
