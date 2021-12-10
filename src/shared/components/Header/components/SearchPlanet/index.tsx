import { ChangeEvent, FC, useRef, useState } from 'react';

import { FaSearch } from 'react-icons/fa';

import { usePlanets } from '~/hooks/planets';

import { Wrapper, Input, Icon, HrInput, WrapperInput } from './styles';

export const SearchPlanet: FC = () => {
  const { changeName } = usePlanets();
  const [valueInput, setValueInput] = useState('');
  const [isVisible, setVisible] = useState(false);
  const inputRef: any = useRef(null);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValueInput(evt.target.value);
    changeName(valueInput);
  };

  const handleInputVisible = (): void => {
    setVisible((prev) => !prev);
    if (isVisible) {
      changeName('');
    } else inputRef.current?.focus();
    setValueInput('');
  };

  return (
    <Wrapper>
      <WrapperInput visibility={isVisible}>
        <Input
          ref={inputRef}
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
