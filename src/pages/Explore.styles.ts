import styled from 'styled-components';

export const ExplorePageContainer = styled.div`
  display: grid;
  grid-template-columns: 230px auto 480px; /* Menu lateral, feed principal, barra lateral */
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  background-color: #ffffff;
`;

export const ExploreContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  overflow-y: auto; /* Permite scroll apenas no conteúdo */
  background-color: #ffffff;
  width: 600px;
`;

export const ExploreTitle = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #14171a;
  border-bottom: 1px solid #e1e8ed;
  padding-bottom: 15px;
`;

export const TrendingTopicsList = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f5f8fa;
    }

    .wh-label {
      font-size: 0.6rem;
      color: #657786;
    }

    .wh-title {
      font-size: 0.8rem;
      font-weight: bold;
      color: #14171a;
    }
  }
`;