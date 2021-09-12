import { FC, createContext, useContext, useCallback, useState } from 'react';
import { requestEndPoint, requestPlanets } from '../services/planetsAPI';
import TFilters from '../types/TFilters';
import TPlanets from '../types/TPlanet';
import TPlanetsContext from '../types/TPlanetsContext';

const PlanetsContext = createContext<TPlanetsContext>({} as TPlanetsContext);

const PlanetsProvider: FC = ({ children }) => {
  const [planets, setPlanets] = useState<TPlanets[]>([]);
  const [filters, setFilters] = useState<TFilters>({
    name: '',
    orderBy: 'name',
    sequence: true,
  });

  const fetchPlanets = useCallback(async () => {
    let response = await requestPlanets();
    while (response.next) {
      setPlanets((prev) => [...prev, ...response.results]);
      response = await requestEndPoint(response.next);
    }
    setPlanets((prev) => [...prev, ...response.results]);
  }, []);

  const changeName = (value: string): void => {
    setFilters({ ...filters, name: value });
  };

  const changeFilters = (value: TFilters): void => {
    setFilters({
      ...filters,
      orderBy: value.orderBy,
      sequence: value.sequence,
    });
  };

  return (
    <PlanetsContext.Provider
      value={{ filters, changeName, changeFilters, planets, fetchPlanets }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};

function usePlanets() {
  return useContext(PlanetsContext);
}

export { PlanetsProvider, usePlanets };
