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
  const [newTweetContent, setNewTweetContent] = useState(''); // Estado para o conteúdo do novo tweet

  useEffect(() => {
    setLoading(true);
    listarTweets().then((tweets) => {
      setLoading(false);
      setListaTweets(tweets);
    });
  }, []);

  const handleCreateTweet = async () => {
  try {
    const createdTweet = await criarTweetApi({ descricao: newTweetContent });
    console.log('Tweet criado:', createdTweet); // Log para depuração

    // Adiciona o novo tweet à lista de tweets
    setListaTweets((prevTweets) => [createdTweet, ...prevTweets]);

    // Limpa o campo de texto e fecha o modal
    setNewTweetContent('');
    setIsModalOpen(false);
  } catch (error) {
    console.error('Erro ao criar tweet:', error);
    alert('Ocorreu um erro ao criar o tweet. Tente novamente.');
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
          onSubmit={handleCreateTweet} // Chama a função sem argumentos
          value={newTweetContent} // Passa o valor do novo tweet
          onChange={(e) => setNewTweetContent(e.target.value)} // Atualiza o estado do novo tweet
        />
      )}
    </PageContainer>
  );
}