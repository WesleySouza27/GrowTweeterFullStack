import { Asside } from '../components/Asside';
import {
  ExplorePageContainer,
  ExploreContent,
  ExploreTitle,
  TrendingTopicsList,
} from './Explore.styles';
import { trendingTopics } from '../constants/trendingTopics';
import { Navigate } from '../components/Navigate';

export function Explore() {

  const handleTweetClick = () => {
    console.log('Botão Tweetar clicado!');
    // Adicione aqui a lógica para abrir o modal de tweet, se necessário
  };
  return (
    <ExplorePageContainer>
      <Navigate onTweetClick={handleTweetClick} />
      <ExploreContent>
        <ExploreTitle>Explorar</ExploreTitle>
        <TrendingTopicsList>
          <h2>Assuntos do Momento</h2>
          <ul>
            {trendingTopics.map((topic, idx) => (
              <li key={idx}>
                <p className="wh-label">{topic.label}</p>
                <p className="wh-title">{topic.title}</p>
              </li>
            ))}
          </ul>
        </TrendingTopicsList>
      </ExploreContent>
      <Asside />
    </ExplorePageContainer>
  );
}