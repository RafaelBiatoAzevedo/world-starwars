import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 10px;

  right: 20px;
  bottom: 5px;
`;

type TWrapperInput = {
  visibility: boolean;
};

export const WrapperInput = styled.div<TWrapperInput>`
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: ${({ visibility }) => (visibility ? '450px' : '0px')};
  /* visibility: ${({ visibility }) => (visibility ? 'visible' : 'hidden')}; */

  transition: width 1s;
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 24px;
  padding: 5px 20px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondary};
    font-size: 24px;
  }
`;

export const Icon = styled.p`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 25px;
`;

export const HrInput = styled.hr`
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  width: 100%;
  height: 1px;
`;
