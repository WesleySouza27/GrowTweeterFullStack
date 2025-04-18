import styled from 'styled-components';

export const AssideContainer = styled.aside`
  padding: 15px 20px; /* Ajuste de espaçamento interno */
  background-color:#e9e9e9;
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */
  margin: 20px 0 0 40px;
  width: 80%; /* Ajusta ao tamanho do container */
  max-width: 280px; /* Limita a largura máxima */
  font-family: 'Arial', sans-serif; /* Fonte padrão */
  height: 250px;
  
`;

export const TrendingTopics = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #14171a;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 0.7rem;
    color:rgb(146, 130, 122);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    /* Estilo para os detalhes dos tópicos */
    p {
      margin: 0;
      font-size: 0.7rem;
      color: #aab8c2;
    }

    .wh-title {
      font-size: 0.8rem;
      font-weight: bold;
      color: #14171a;
    }
  }
`;

export const ShowMoreButton = styled.button`
  border: none;
  color: #1da1f2;
  font-size: 0.6rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #e9e9e9;
  margin-top: 20px;

  &:hover {
    color:rgb(90, 143, 92);
  }
`;