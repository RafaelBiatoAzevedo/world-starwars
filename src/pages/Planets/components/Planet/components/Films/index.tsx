import { FC } from 'react';

import { useTheme } from 'styled-components';

import filmsImages from '~/shared/utils/filmsImages';
import { Text } from '~/shared/components/Text';
import { useFilms } from '~/hooks/films';

import { Wrapper, WrapperCards, Title, CardFilm, Image } from './styles';

type TFilms = {
  filmsEndPoints?: string[];
};

export const Films: FC<TFilms> = ({ filmsEndPoints }) => {
  const { colors, fontWeight } = useTheme();
  const { films } = useFilms();
  const indexFilms = filmsEndPoints?.map((film) =>
    Number(film[film.length - 2])
  );

  return (
    <Wrapper>
      <Title>
        <Text
          title="Filmes"
          color={colors.secondary}
          weight={fontWeight.bold}
          fontFamily="StarJedi"
          size="2.5rem"
        />
      </Title>
      <WrapperCards>
        {films?.map((film) =>
          indexFilms?.includes(film.episode_id) ? (
            <CardFilm>
              <Text
                title={`${film.title} (${film.release_date.slice(0, 4)})`}
                color={colors.grayDark}
                size="1.2rem"
              />
              <Image src={filmsImages[film.episode_id - 1]} />
            </CardFilm>
          ) : null
        )}
      </WrapperCards>
    </Wrapper>
  );
};

Films.defaultProps = {
  filmsEndPoints: undefined,
};
