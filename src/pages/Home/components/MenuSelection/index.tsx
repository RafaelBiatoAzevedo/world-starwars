import { FC } from 'react';

import { Button } from './components/Button';

import { Wrapper } from './styles';

export const MenuSelection: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Button
        image="https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
        title="Planetas"
        description="Pesquise ou Navegue nos planetas do mundo Star Wars"
      />
      <Button
        image="https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
        title="Veículos"
        description="Pesquise ou Navegue nos veículos do mundo Star Wars"
      />
      <Button
        image="https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
        title="Personagens"
        description="Pesquise ou Navegue nos Personagens do mundo Star Wars"
      />
      <Button
        image="https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
        title="Filmes"
        description="Pesquise ou Navegue nos Personagens do mundo Star Wars"
      />
      <Button
        image="https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
        title="Especies"
        description="Pesquise ou Navegue nos Personagens do mundo Star Wars"
      />
      <Button
        image="https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg"
        title="Naves"
        description="Pesquise ou Navegue nos Personagens do mundo Star Wars"
      />
    </Wrapper>
  );
};
