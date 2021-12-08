import { FC, useCallback, useEffect, useState } from 'react';

import { AiFillPlusCircle } from 'react-icons/ai';

import TPlanets from '~/types/TPlanet';
import TPlanet from '~/types/TPlanet';
import { TOrderBy } from '~/types/TFilters';
import { usePlanets } from '~/hooks/planets';
import { useModeView } from '~/hooks/modeView';

import { ArrowSequence } from './components/ArrowSequence';

import { WrapperGrid, Grid, ContentGrid, Icon, Loading } from './styles';

type TTitles = {
  originalTitle: TOrderBy;
  ptTitle: string;
};

const TITLES: TTitles[] = [
  { originalTitle: 'name', ptTitle: 'nome' },
  { originalTitle: 'population', ptTitle: 'population' },
  { originalTitle: 'diameter', ptTitle: 'diametro' },
  { originalTitle: 'rotation_period', ptTitle: 'rotação' },
  { originalTitle: 'orbital_period', ptTitle: 'orbita' },
  { originalTitle: 'surface_water', ptTitle: 'água superfície' },
  { originalTitle: 'climate', ptTitle: 'clima' },
  { originalTitle: 'gravity', ptTitle: 'gravidade' },
  { originalTitle: 'terrain', ptTitle: 'terreno' },
];

export const GridPlanets: FC = () => {
  const { planets, filters, changeFilters, fetchAllPlanets, changePlanetView } =
    usePlanets();
  const [planetsFiltered, setPlanetsFiltered] = useState<TPlanets[]>([]);
  const { changeModeView } = useModeView();

  useEffect(() => {
    if (planets.length === 0) fetchAllPlanets();
  }, [planets, fetchAllPlanets]);

  function setOrder(a: string, b: string): number {
    const Maior = -1;
    const Menor = 1;
    const Igual = 0;
    if (a < b) return Maior;
    if (b > a) return Menor;
    return Igual;
  }

  const sortPlanets = useCallback(
    (listPlanets: TPlanets[]): TPlanets[] => {
      let sortResult = [];

      if (
        filters.orderBy === 'name' ||
        filters.orderBy === 'climate' ||
        filters.orderBy === 'gravity' ||
        filters.orderBy === 'terrain'
      ) {
        if (filters.sequence) {
          sortResult = listPlanets.sort((a, b) =>
            setOrder(String(a[filters.orderBy]), String(b[filters.orderBy]))
          );
        } else {
          sortResult = listPlanets.sort((a, b) =>
            setOrder(String(b[filters.orderBy]), String(a[filters.orderBy]))
          );
        }
      } else if (filters.sequence) {
        sortResult = listPlanets.sort((a, b) => {
          if (b[filters.orderBy] === 'unknown') return -1;
          return Number(a[filters.orderBy]) - Number(b[filters.orderBy]);
        });
      } else {
        sortResult = listPlanets.sort((a, b) => {
          if (b[filters.orderBy] === 'unknown') return -1;
          return Number(b[filters.orderBy]) - Number(a[filters.orderBy]);
        });
      }

      return sortResult;
    },
    [filters.orderBy, filters.sequence]
  );

  const filterByName = useCallback(
    (listPlanets: TPlanets[]): TPlanets[] => {
      let filterResult = [];
      if (!filters.name) return listPlanets;

      filterResult = listPlanets.filter((planet) =>
        planet.name.toUpperCase().includes(filters.name.toUpperCase())
      );

      return filterResult;
    },
    [filters.name]
  );

  useEffect(() => {
    let planetsResult = [...planets];

    planetsResult = sortPlanets(planetsResult);
    planetsResult = filterByName(planetsResult);

    setPlanetsFiltered(planetsResult);
  }, [planets, filters, filterByName, sortPlanets]);

  const handleChangeFilters = (value: TOrderBy): void => {
    changeFilters({
      ...filters,
      orderBy: value,
      sequence: !filters.sequence,
    });
  };

  const handleViewPlanet = (planet: TPlanet): void => {
    changePlanetView(planet);
    changeModeView('show');
  };

  return (
    <WrapperGrid>
      {planetsFiltered.length === 0 ? (
        <Loading>CARREGANDO PLANETAS...</Loading>
      ) : (
        <>
          <Grid className="title">
            {TITLES.map((title) => (
              <ContentGrid
                onClick={() => handleChangeFilters(title.originalTitle)}
                className="title"
              >
                <ArrowSequence value={title.originalTitle} />
                {title.ptTitle}
              </ContentGrid>
            ))}
            <ContentGrid className="title">info</ContentGrid>
          </Grid>
          <Grid className="scroll">
            {planetsFiltered.map((planet) => (
              <>
                <ContentGrid>{planet.name.toUpperCase()}</ContentGrid>
                <ContentGrid>{planet.population}</ContentGrid>
                <ContentGrid>{planet.diameter}</ContentGrid>
                <ContentGrid>{planet.rotation_period}</ContentGrid>
                <ContentGrid>{planet.orbital_period}</ContentGrid>
                <ContentGrid>{planet.surface_water}</ContentGrid>
                <ContentGrid>{planet.climate}</ContentGrid>
                <ContentGrid>{planet.gravity}</ContentGrid>
                <ContentGrid>{planet.terrain}</ContentGrid>
                <ContentGrid>
                  <Icon onClick={() => handleViewPlanet(planet)}>
                    <AiFillPlusCircle />
                  </Icon>
                </ContentGrid>
              </>
            ))}
          </Grid>
        </>
      )}
    </WrapperGrid>
  );
};
