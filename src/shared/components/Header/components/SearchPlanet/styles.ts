import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;

  right: 40px;
  bottom: 20px;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    right: 30px;
    bottom: 10px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    right: 20px;
    bottom: 5px;
  }
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
  width: ${({ visibility }) => (visibility ? '430px' : '0px')};

  transition: width 1s;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    width: ${({ visibility }) => (visibility ? '250px' : '0px')};
  }
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  padding: 5px 15px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 20px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 12px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.secondary};
      font-size: 10px;
    }
  }
`;

export const Icon = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: 30px;

  @media (max-width: ${({ theme }) => theme.resolutions.medium}) {
    font-size: 18px;
  }

  @media (max-width: ${({ theme }) => theme.resolutions.small}) {
    font-size: 14px;
  }
`;

export const HrInput = styled.hr`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  width: 100%;
  height: 1px;
`;
