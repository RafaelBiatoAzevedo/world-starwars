import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { TFilm } from '~/types/TFilm';
import { requestFilms } from '~/services/planetsAPI';
import { IContextFilms } from '~/interfaces/IContextFilms';

const FilmsContext = createContext<IContextFilms>({} as IContextFilms);

const FilmsProvider: FC = ({ children }) => {
  const [films, setFilms] = useState<TFilm[]>([]);

  useEffect(() => {
    requestFilms().then((response) => setFilms(response.results));
  }, []);

  const valuesContext = useMemo(
    () => ({
      films,
    }),
    [films]
  );

  return (
    <FilmsContext.Provider value={valuesContext}>
      {children}
    </FilmsContext.Provider>
  );
};

const useFilms = (): IContextFilms => {
  return useContext(FilmsContext);
};

export { FilmsProvider, useFilms };
