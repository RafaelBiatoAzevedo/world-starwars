import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: ${(p) => p.theme.colors.grayLight};
  flex: 1;
  flex-wrap: wrap;

  padding: 20px;
  gap: 3.5rem;
`;
