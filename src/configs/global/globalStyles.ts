import styled from 'styled-components';

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 230px auto 480px; /* Menu lateral, feed principal, barra lateral */
  max-width: 1200px; /* Define a largura máxima */
  margin: 0 auto; /* Centraliza a página */
  height: 100vh;
  background-color: #f5f8fa;
  font-family: Karla, Roboto, sans-serif;
  overflow: hidden; /* Remove o scroll geral da página */
  background-color: #ffffff;
`;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    overflow: hidden; /* Remove o scroll geral */
    font-family: 'Karla', 'Roboto', sans-serif; /* Define a fonte global */
    background-color: #f5f8fa; /* Cor de fundo global */
  }

  #root {
    height: 100%; /* Garante que o root ocupe toda a altura */
    display: flex;
    flex-direction: column;
    background-color: #ffffff; /* Cor de fundo global */
  }
`;