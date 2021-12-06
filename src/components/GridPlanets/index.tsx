import { FC, useEffect, useState } from 'react';
import { usePlanets } from '../../hooks/planets';
import { AiFillPlusCircle } from 'react-icons/ai';

import { WrapperGrid, Grid, ContentGrid, Icon, Loading } from './styles';
import TPlanets from '../../types/TPlanet';
import { ArrowSequence } from './components/ArrowSequence';
import { TOrderBy } from '../../types/TFilters';
import { useModeView } from '../../hooks/modeView';
import TPlanet from '../../types/TPlanet';

type TTitles = {
  originalTitle: TOrderBy;
  pt_title: string;
};

const TITLES: TTitles[] = [
  { originalTitle: 'name', pt_title: 'nome' },
  { originalTitle: 'population', pt_title: 'population' },
  { originalTitle: 'diameter', pt_title: 'diametro' },
  { originalTitle: 'rotation_period', pt_title: 'rotação' },
  { originalTitle: 'orbital_period', pt_title: 'orbita' },
  { originalTitle: 'surface_water', pt_title: 'água superfície' },
  { originalTitle: 'climate', pt_title: 'clima' },
  { originalTitle: 'gravity', pt_title: 'gravidade' },
  { originalTitle: 'terrain', pt_title: 'terreno' },
];

export const GridPlanets: FC = () => {
  const { planets, filters, changeFilters, fetchAllPlanets, changePlanetView } =
    usePlanets();
  const [planetsFiltered, setPlanetsFiltered] = useState<TPlanets[]>([]);
  const { changeModeView } = useModeView();

  useEffect(() => {
    fetchAllPlanets();
  }, []);

  function setOrder(a: string, b: string): number {
    const Maior = -1;
    const Menor = 1;
    const Igual = 0;
    if (a < b) return Maior;
    if (b > a) return Menor;
    return Igual;
  }

  const sortPlanets = (listPlanets: TPlanets[]): TPlanets[] => {
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
    } else {
      if (filters.sequence) {
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
    }

    return sortResult;
  };

  const FilterByName = (listPlanets: TPlanets[]): TPlanets[] => {
    let filterResult = [];
    if (!filters.name) return listPlanets;
    else {
      filterResult = listPlanets.filter((planet) =>
        planet.name.toUpperCase().includes(filters.name.toUpperCase())
      );
    }
    return filterResult;
  };

  useEffect(() => {
    let planetsResult = [...planets];

    planetsResult = sortPlanets(planetsResult);
    planetsResult = FilterByName(planetsResult);

    setPlanetsFiltered(planetsResult);
  }, [planets, filters]);

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
                {title.pt_title}
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
