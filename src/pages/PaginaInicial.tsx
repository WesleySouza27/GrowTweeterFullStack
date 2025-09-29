import { useEffect, useState } from 'react';
import { TweetInterface } from '../interfaces/Interface';
import { criarTweetApi, criarReply } from '../services/growTweeter-api/tweets/criar';
import { ListarTweets } from '../components/ListarTweets';
import { Navigate } from '../components/Navigate';
import { Asside } from '../components/Asside';
import { TweetModal } from '../components/TweetModal/TweetModal';
import { listarFeed } from '../services/growTweeter-api/tweets/listar';
import {
  FeedContainer,
  FeedTitle,
  TweetsList,
} from './PaginaInicial.styles';
import { PageContainer } from '../configs/global/globalStyles';

export function PaginaInicial() {
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [tweetParaResponder, setTweetParaResponder] = useState<TweetInterface | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [listaTweets, setListaTweets] = useState<TweetInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTweetContent, setNewTweetContent] = useState('');

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Faça login para ver seu feed!');
      setLoading(false);
      window.location.href = '/login';
      return;
    }
    listarFeed()
      .then((tweets) => {
        setListaTweets(tweets ?? []);
      })
      .catch((e: any) => {
        console.error('Erro ao carregar feed:', e?.response?.status, e?.response?.data || e?.message);
        const status = e?.response?.status;
        if (status === 401 || status === 403) {
          alert('Sessão expirada. Faça login novamente.');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        } else {
          alert('Erro ao carregar feed');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Função para abrir o modal de reply
  const handleOpenReplyModal = (tweet: TweetInterface) => {
    setTweetParaResponder(tweet);
    setReplyContent('');
    setReplyModalOpen(true);
  };

  // Função para enviar reply
  const handleReply = async () => {
    if (!tweetParaResponder) return;
    try {
      const payload = {
        tweetId: tweetParaResponder.id,
        descricao: replyContent,
      };
      const createdReply = await criarReply(payload);
      // Atualiza replies do tweet na lista
      setListaTweets((prevTweets) =>
        prevTweets.map((t) =>
          t.id === tweetParaResponder.id
            ? {
                ...t,
                replies: [...(t.replies || []), createdReply],
              }
            : t
        )
      );
      setReplyModalOpen(false);
      setReplyContent('');
    } catch (error) {
      alert('Erro ao enviar resposta. Tente novamente.');
      console.error('Erro ao enviar reply:', error);
    }
  };

  const handleCreateTweet = async () => {
    try {
      const createdTweet = await criarTweetApi({ descricao: newTweetContent });
      setListaTweets((prevTweets) => [createdTweet, ...prevTweets]);
      setNewTweetContent('');
      setIsModalOpen(false);
    } catch (error) {
      alert('Ocorreu um erro ao criar o tweet. Tente novamente.');
      console.error('Erro ao criar tweet:', error);
    }
  };

  return (
    <PageContainer>
      <Navigate onTweetClick={() => setIsModalOpen(true)} />
      <FeedContainer>
        <FeedTitle>Página Inicial</FeedTitle>
        <TweetsList>
          {loading ? (
            <p>Carregando tweets...</p>
          ) : (
            <ListarTweets
              tweet={listaTweets}
              onReplyClick={handleOpenReplyModal} // Passe a função para cada Tweet
            />
          )}
        </TweetsList>
      </FeedContainer>
      <Asside />

      {/* Modal para novo tweet */}
      {isModalOpen && (
        <TweetModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTweet}
          value={newTweetContent}
          onChange={(e) => setNewTweetContent(e.target.value)}
        />
      )}

      {/* Modal global de reply */}
      {replyModalOpen && tweetParaResponder && (
        <TweetModal
          onClose={() => setReplyModalOpen(false)}
          onSubmit={handleReply}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Escreva sua resposta..."
        />
      )}
    </PageContainer>
  );
}