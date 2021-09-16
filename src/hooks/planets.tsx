import { FC, createContext, useContext, useState, useEffect } from 'react';

import { requestEndPoint, requestPlanet } from '../services/planetsAPI';

import { TFilters } from '../types/TFilters';
import TPlanet from '../types/TPlanet';
import TPlanetsContext from '../types/TPlanetsContext';
import TPlanetView from '../types/TPlanetView';

const PlanetsContext = createContext<TPlanetsContext>({} as TPlanetsContext);

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

  const fetchAllPlanets = () => {
    let arrayFetch = [];
    for (let i = 1; i <= 60; i += 1) {
      arrayFetch.push(requestEndPoint(`https://swapi.dev/api/planets/${i}`));
    }
    Promise.all(arrayFetch).then((responses) => setPlanets(responses));
  };

  const changeName = (value: string): void => {
    setFilters({ ...filters, name: value });
  };

  const nextPlanetView = (): void => {
    if (planetView.next <= 60) {
      requestPlanet(planetView.next).then((response) =>
        setPlanetView({
          next: planetView.next + 1,
          previus: planetView.previus + 1,
          planet: response,
        })
      );
    }
  };

  const changePlanetView = (planet: TPlanet): void => {
    const planetNumber = planet.url.replace(/\D/g, '');
    setPlanetView({
      next: Number(planetNumber) + 1,
      previus: Number(planetNumber) - 1,
      planet,
    });
  };

  const previusPlanetView = (): void => {
    if (planetView.previus !== 0) {
      requestPlanet(planetView.previus).then((response) =>
        setPlanetView({
          next: planetView.next - 1,
          previus: planetView.previus - 1,
          planet: response,
        })
      );
    }
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
      value={{
        planetView,
        nextPlanetView,
        previusPlanetView,
        filters,
        changeName,
        changeFilters,
        changePlanetView,
        planets,
        fetchAllPlanets,
      }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};

function usePlanets() {
  return useContext(PlanetsContext);
}

export { PlanetsProvider, usePlanets };
