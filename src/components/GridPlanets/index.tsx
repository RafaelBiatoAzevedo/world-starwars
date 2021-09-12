import { FC, useEffect, useState } from 'react';
import { usePlanets } from '../../hooks/planets';
import { AiFillPlusCircle } from 'react-icons/ai';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';

import { WrapperGrid, Grid, ContentGrid, Icon } from './styles';
import TPlanets from '../../types/TPlanet';

const TITLES = [
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
  const { planets, fetchPlanets, filters, changeFilters } = usePlanets();
  const [planetsFiltered, setPlanetsFiltered] = useState<TPlanets[]>([]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const sortPlanets = (listPlanets: TPlanets[]): TPlanets[] => {
    let sortResult = [];

    if (filters.sequence) {
      sortResult = listPlanets.sort(
        (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
      );
    } else {
      sortResult = listPlanets.sort(
        (a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0)
      );
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

  const handleChangeFilters = (value: string): void => {
    changeFilters({
      ...filters,
      orderBy: value,
      sequence: !filters.sequence,
    });
  };

  const renderArrowSequence = (value: string): JSX.Element => {
    if (filters.orderBy === value) {
      if (filters.sequence) {
        return (
          <Icon className="sequence">
            <GoArrowDown />
          </Icon>
        );
      } else
        return (
          <Icon className="sequence">
            <GoArrowUp />
          </Icon>
        );
    }
    return <> </>;
  };

  return (
    <WrapperGrid>
      <Grid className="title">
        {TITLES.map((title) => (
          <ContentGrid
            onClick={() => handleChangeFilters(title.originalTitle)}
            className="title"
          >
            {renderArrowSequence(title.originalTitle)}
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
              <Icon>
                <AiFillPlusCircle />
              </Icon>
            </ContentGrid>
          </>
        ))}
      </Grid>
    </WrapperGrid>
  );
};
