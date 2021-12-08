import { FC } from 'react';

import { useTheme } from 'styled-components';

import planetsDescriptions from '~/shared/utils/planetsDescriptions';
import planetsImages from '~/shared/utils/planetImages';
import { MenuNavLink } from '~/shared/components/MenuNavLink';
import { usePlanets } from '~/hooks/planets';

import { Residents } from './components/Residents';
import { PlanetsInformations } from './components/PlanetsInformations';
import { Films } from './components/Films';
import { Text } from '../../../../shared/components/Text';

import { Wrapper, WrapperContent, WrapperDescription, Image } from './styles';

export const Planet: FC = () => {
  const { colors } = useTheme();
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
          <Text
            title={planetsDescriptions[(planetView?.next || 2) - 2]?.pt}
            color={colors.grayDark}
            size="1.6rem"
            paddingX="20px"
          />
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
