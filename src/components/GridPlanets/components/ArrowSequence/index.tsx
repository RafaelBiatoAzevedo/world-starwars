import { FC } from 'react';
import { usePlanets } from '../../../../hooks/planets';

import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { Icon } from './styles';

type TArrowSequence = {
  value: String;
};

export const ArrowSequence: FC<TArrowSequence> = ({ value }) => {
  const { filters } = usePlanets();

  return (
    <>
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
    </>
  );
};
