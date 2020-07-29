import styled from 'styled-components';

const CadastroLayout = styled.main`
  background-color: var(--black);
  color: var(--white);
  flex: 1;
  padding: 25px 5%;

  h1 {
    margin: 0;
  }

  @media (max-width: 800px) {
    padding-top: 25px;
  }
`;

export default CadastroLayout;
