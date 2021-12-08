import { ChangeEvent, FC, useState } from 'react';

import { FaSearch } from 'react-icons/fa';

import { usePlanets } from '~/hooks/planets';

import { Wrapper, Input, Icon, HrInput, WrapperInput } from './styles';

export const SearchPlanet: FC = () => {
  const { changeName } = usePlanets();
  const [valueInput, setValueInput] = useState('');
  const [isVisible, setVisible] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValueInput(evt.target.value);
    changeName(valueInput);
  };

  const handleInputVisible = (): void => {
    setVisible((prev) => !prev);
    if (isVisible) changeName('');
    setValueInput('');
  };

  return (
    <Wrapper>
      <WrapperInput visibility={isVisible}>
        <Input
          autoFocus={isVisible}
          value={valueInput}
          onChange={handleChange}
          type="text"
          placeholder="Digite o nome do planeta para buscar"
        />
        <HrInput />
      </WrapperInput>
      <Icon onClick={handleInputVisible}>
        <FaSearch />
      </Icon>
    </Wrapper>
  );
};
