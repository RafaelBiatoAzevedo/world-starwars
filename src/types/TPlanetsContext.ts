import { TFilters } from './TFilters';
import TPlanet from './TPlanet';
import TPlanetView from './TPlanetView';

type TPlanetsContext = {
  filters: TFilters;
  changeName: (value: string) => void;
  changeFilters: (value: TFilters) => void;

  planets: TPlanet[];
  fetchAllPlanets: () => void;

  planetView: TPlanetView;
  nextPlanetView: () => void;
  previusPlanetView: () => void;
  changePlanetView: (planet: TPlanet) => void;
};

export default TPlanetsContext;
