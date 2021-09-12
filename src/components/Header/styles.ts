import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;

  gap: 20px;
  padding: 20px;

  background-color: ${({ theme }) => theme.primary};
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-family: StarJedi;
  font-size: 80px;
`;

export const Image = styled.img`
  width: 40%;
`;
