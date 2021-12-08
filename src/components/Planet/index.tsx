import { FC } from 'react';

import planetsDescriptions from '~/shared/utils/planetsDescriptions';
import planetsImages from '~/shared/utils/planetImages';
import { MenuNavLink } from '~/shared/components/MenuNavLink';
import { usePlanets } from '~/hooks/planets';

import { Residents } from './components/Residents';
import { PlanetsInformations } from './components/PlanetsInformations';
import { Films } from './components/Films';

import {
  Wrapper,
  WrapperContent,
  WrapperDescription,
  Image,
  Text,
} from './styles';

export const Planet: FC = () => {
  const { nextPlanetView, previusPlanetView, planetView } = usePlanets();
  const imagesPosition = planetsImages[planetView.next - 2];

  return (
    <Wrapper>
      <MenuNavLink
        next={nextPlanetView}
        previus={previusPlanetView}
        title={planetView.planet?.name || ''}
      />
      <WrapperContent>
        <WrapperDescription>
          <Image src={imagesPosition?.[0]} />
          <Text>{planetsDescriptions[(planetView?.next || 2) - 2]?.pt}</Text>
        </WrapperDescription>
        <PlanetsInformations
          planet={planetView?.planet}
          images={{
            image1: imagesPosition?.[1],
            image2: imagesPosition?.[2],
          }}
        />
        {(planetView?.planet?.films.length || 0) > 0 && <Residents />}
        {(planetView?.planet?.films.length || 0) > 0 && (
          <Films filmsEndPoints={planetView.planet?.films} />
        )}
      </WrapperContent>
    </Wrapper>
  );
};
