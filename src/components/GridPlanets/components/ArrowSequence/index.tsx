import { FC } from 'react';

import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

import { usePlanets } from '~/hooks/planets';

import { Icon, Wrapper } from './styles';

type TArrowSequence = {
  value: string;
};

export const ArrowSequence: FC<TArrowSequence> = ({ value }) => {
  const { filters } = usePlanets();

  return (
    <Wrapper>
      {filters.orderBy === value ? (
        filters.sequence ? (
          <Icon>
            {' '}
            <MdArrowDropDown />{' '}
          </Icon>
        ) : (
          <Icon>
            <MdArrowDropUp />
          </Icon>
        )
      ) : null}
    </Wrapper>
  );
};
