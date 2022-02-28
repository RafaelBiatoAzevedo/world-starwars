import { FC } from 'react';

import { IoPlanetSharp, IoPeopleSharp } from 'react-icons/io5';
import { IoMdPerson } from 'react-icons/io';
import { GiUfo } from 'react-icons/gi';
import { FaCar, FaFilm } from 'react-icons/fa';

import { Header } from '~/shared/components/Header';

import { Link } from './components/Link';

import { Wrapper, WrapperLinks } from './styles';

export const Home: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Header title="mundo" />
      <WrapperLinks>
        <Link to="/planets" icon={IoPlanetSharp} title="Planetas" />
        <Link to="/vehicles" icon={FaCar} title="Veículos" />
        <Link to="/characters" icon={IoMdPerson} title="Personagens" />
        <Link to="/films" icon={FaFilm} title="Filmes" />
        <Link to="/species" icon={IoPeopleSharp} title="Especies" />
        <Link to="/starships" icon={GiUfo} title="Naves" />
      </WrapperLinks>
    </Wrapper>
  );
};
