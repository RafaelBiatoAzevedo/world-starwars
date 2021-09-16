import { FC } from 'react';
import { useFilms } from '../../../../hooks/films';
import filmsImages from '../../../../shared/utils/filmsImages';

import {
  Wrapper,
  WrapperCards,
  Title,
  CardFilm,
  SubTitle,
  Image,
} from './styles';

type TFilms = {
  filmsEndPoints?: string[];
};

export const Films: FC<TFilms> = ({ filmsEndPoints }) => {
  const { films } = useFilms();
  const indexFilms = filmsEndPoints?.map((film) =>
    Number(film[film.length - 2])
  );

  return (
    <Wrapper>
      <Title>Filmes</Title>
      <WrapperCards>
        {films?.map((film) =>
          indexFilms?.includes(film.episode_id) ? (
            <CardFilm>
              <SubTitle>{`${film.title} (${film.release_date.slice(
                0,
                4
              )})`}</SubTitle>
              <Image src={filmsImages[film.episode_id - 1]}></Image>
            </CardFilm>
          ) : null
        )}
      </WrapperCards>
    </Wrapper>
  );
};
