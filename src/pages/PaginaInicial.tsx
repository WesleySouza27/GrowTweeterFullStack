import { useEffect, useState } from 'react';
import { TweetInterface } from '../interfaces/Interface';
import { listarTweets } from '../services/growTweeter-api/tweets/listar';
import { criarTweetApi } from '../services/growTweeter-api/tweets/criar';
import { ListarTweets } from '../components/ListarTweets';
import { Navigate } from '../components/Navigate';
import { Asside } from '../components/Asside';
import { TweetModal } from '../components/TweetModal/TweetModal';
import {
  // Container,
  FeedContainer,
  FeedTitle,
  TweetsList,
} from './PaginaInicial.styles';
import { PageContainer } from '../configs/global/globalStyles';

export function PaginaInicial() {
  const [loading, setLoading] = useState(true);
  const [listaTweets, setListaTweets] = useState<TweetInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    listarTweets().then((tweets) => {
      setLoading(false);
      setListaTweets(tweets);
    });
  }, []);

  const handleCreateTweet = async (descricao: string) => {
    try {
      const newTweet = await criarTweetApi({ descricao });
      if (newTweet) {
        setListaTweets([newTweet, ...listaTweets]);
        setIsModalOpen(false);
      } else {
        console.error('Erro: o tweet criado é indefinido.');
      }
    } catch (error) {
      console.error('Erro ao criar tweet:', error);
    }
  };

  return (
    <PageContainer>
      <Navigate onTweetClick={() => setIsModalOpen(true)} />
      <FeedContainer>
        <FeedTitle>Página Inicial</FeedTitle>
        <TweetsList>
          {loading ? <p>Carregando tweets...</p> : <ListarTweets tweet={listaTweets} />}
        </TweetsList>
      </FeedContainer>
      <Asside />
      {isModalOpen && (
        <TweetModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTweet}
        />
      )}
    </PageContainer>
  );
}