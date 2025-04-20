import { useState } from 'react';
import { Asside } from '../components/Asside';
import {
  ExplorePageContainer,
  ExploreContent,
  ExploreTitle,
  TrendingTopicsList,
} from './Explore.styles';
import { trendingTopics } from '../constants/trendingTopics';
import { Navigate } from '../components/Navigate';
import { TweetModal } from '../components/TweetModal/TweetModal';
import { criarTweetApi } from '../services/growTweeter-api/tweets/criar';

export function Explore() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTweetContent, setNewTweetContent] = useState(''); // Estado para o conteúdo do novo tweet

  const handleCreateTweet = async () => {
    try {
      const createdTweet = await criarTweetApi({ descricao: newTweetContent });
      console.log('Tweet criado:', createdTweet); // Log para depuração

      // Limpa o campo de texto e fecha o modal
      setNewTweetContent('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar tweet:', error);
      alert('Ocorreu um erro ao criar o tweet. Tente novamente.');
    }
  };

  return (
    <ExplorePageContainer>
      <Navigate onTweetClick={() => setIsModalOpen(true)} />
      <ExploreContent>
        <ExploreTitle>Explorar</ExploreTitle>
        <TrendingTopicsList>
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

      {/* Modal para criar tweet */}
      {isModalOpen && (
        <TweetModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTweet}
          value={newTweetContent}
          onChange={(e) => setNewTweetContent(e.target.value)}
          placeholder="O que está acontecendo?"
        />
      )}
    </ExplorePageContainer>
  );
}