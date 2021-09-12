import TFilters from './TFilters';
import TPlanets from './TPlanet';

type TPlanetsContext = {
  filters: TFilters;
  changeName: (value: string) => void;
  changeFilters: (value: TFilters) => void;

  planets: TPlanets[];
  fetchPlanets: () => void;
};

export default TPlanetsContext;
