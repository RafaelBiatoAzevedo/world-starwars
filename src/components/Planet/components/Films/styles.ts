import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 40px;
  gap: 20px;
`;

export const WrapperCards = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  gap: 40px;

  width: 100%;
`;

export const Title = styled.p`
  align-items: center;
  display: flex;

  font-family: StarJedi;
  font-size: 40px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.secondary};
  width: 100%;

  &::before {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.secondary};
    margin-right: 20px;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.secondary};
    margin-left: 20px;
  }
`;

export const SubTitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.grayDark};
`;

export const CardFilm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const Image = styled.img`
  border-radius: 4px;

  height: 350px;
  width: 250px;
  box-shadow: -3px 3px 11px 2px #000000;
`;
