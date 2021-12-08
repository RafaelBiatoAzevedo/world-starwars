import TPlanetView from '~/types/TPlanetView';
import TPlanet from '~/types/TPlanet';
import { TFilters } from '~/types/TFilters';

export interface IContextPlanets {
  filters: TFilters;
  changeName: (value: string) => void;
  changeFilters: (value: TFilters) => void;

  planets: TPlanet[];
  fetchAllPlanets: () => void;

  planetView: TPlanetView;
  nextPlanetView: () => void;
  previusPlanetView: () => void;
  changePlanetView: (planet: TPlanet) => void;
}
