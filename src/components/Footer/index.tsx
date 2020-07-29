import React from 'react';

import { Container } from './styles';

import logo from '../../assets/img/footer_logo.png';

const Footer: React.FC = () => {
  return (
    <Container>
      <a href="http://www.angra.net/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Angra" />
      </a>
      <p>
        Orgulhosamente criado durante a <strong>Imersão React da Alura</strong>
      </p>
    </Container>
  );
};

export default Footer;
