import { FC } from 'react';

import headerImage from '../../shared/assets/images/planets.jpg';
import { ModeView } from './components/ModeView';
import { SearchPlanet } from './components/SearchPlanet';

import { Wrapper, Title, Image } from './styles';

export const Header: FC = () => {
  return (
    <Wrapper>
      <ModeView />
      <Title>Planetas</Title>
      <Image src={headerImage} alt="planets" />
      <Title>Star Wars</Title>
      <SearchPlanet></SearchPlanet>
    </Wrapper>
  );
};
