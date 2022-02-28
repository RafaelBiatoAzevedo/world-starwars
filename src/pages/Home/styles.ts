import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  width: 100%;
`;

export const WrapperLinks = styled.div`
  align-items: stretch;
  justify-content: center;
  display: flex;
  background-color: ${(p) => p.theme.colors.grayLight};
  flex: 1;
  flex-wrap: wrap;

  padding: 2rem;
  gap: 3.5rem;
`;
