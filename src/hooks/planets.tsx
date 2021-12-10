import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import TPlanetView from '~/types/TPlanetView';
import { api } from '~/services/api';
import { IContextPlanets } from '~/interfaces/IContextPlanets';

import { requestEndPoint, requestPlanet } from '../services/planetsAPI';

import TPlanet from '../types/TPlanet';
import { TFilters } from '../types/TFilters';

const PlanetsContext = createContext<IContextPlanets>({} as IContextPlanets);

const PlanetsProvider: FC = ({ children }) => {
  const [planets, setPlanets] = useState<TPlanet[]>([]);
  const [planetView, setPlanetView] = useState<TPlanetView>({
    next: 1,
    previus: 0,
    planet: undefined,
  });
  const [filters, setFilters] = useState<TFilters>({
    name: '',
    orderBy: 'name',
    sequence: true,
  });

  useEffect(() => {
    requestPlanet(1).then((response) =>
      setPlanetView({
        next: 2,
        previus: 0,
        planet: response,
      })
    );
  }, []);

  const fetchAllPlanets = async (): Promise<any> => {
    const arrayFetch = [];
    for (let i = 1; i <= 6; i += 1) {
      arrayFetch.push(requestEndPoint(`${api}/planets/?page=${i}`));
    }

    const arrayData: any = await Promise.all(arrayFetch);

    for (let i = 0; i <= 5; i += 1) {
      setPlanets((prev) => [...prev, ...arrayData[i].results]);
    }
  };

  const changeName = useCallback(
    (value: string): void => {
      setFilters({ ...filters, name: value });
    },
    [filters]
  );

  const nextPlanetView = useCallback((): void => {
    if (planetView.next <= 60) {
      requestPlanet(planetView.next).then((response) =>
        setPlanetView({
          next: planetView.next + 1,
          previus: planetView.previus + 1,
          planet: response,
        })
      );
    }
  }, [planetView.next, planetView.previus]);

  const changePlanetView = (planet: TPlanet): void => {
    const planetNumber = planet.url.replace(/\D/g, '');
    setPlanetView({
      next: Number(planetNumber) + 1,
      previus: Number(planetNumber) - 1,
      planet,
    });
  };

  const previusPlanetView = useCallback((): void => {
    if (planetView.previus !== 0) {
      requestPlanet(planetView.previus).then((response) =>
        setPlanetView({
          next: planetView.next - 1,
          previus: planetView.previus - 1,
          planet: response,
        })
      );
    }
  }, [planetView.next, planetView.previus]);

  const changeFilters = useCallback(
    (value: TFilters): void => {
      setFilters({
        ...filters,
        orderBy: value.orderBy,
        sequence: value.sequence,
      });
    },
    [filters]
  );

  const valueContext = useMemo(
    () => ({
      planetView,
      nextPlanetView,
      previusPlanetView,

      filters,

      changeName,
      changeFilters,
      changePlanetView,

      planets,
      fetchAllPlanets,
    }),
    [
      planetView,
      nextPlanetView,
      previusPlanetView,
      planets,
      filters,
      changeName,
      changeFilters,
    ]
  );

  return (
    <PlanetsContext.Provider value={valueContext}>
      {children}
    </PlanetsContext.Provider>
  );
};

function usePlanets(): IContextPlanets {
  return useContext(PlanetsContext);
}

export { PlanetsProvider, usePlanets };
