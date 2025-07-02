import { useState, useEffect } from 'react';
import { Navigate } from '../components/Navigate';
import { ListarTweets } from '../components/ListarTweets';
import { TweetInterface, UsuarioInterface } from '../interfaces/Interface';
import { Asside } from '../components/Asside';
import {
  ProfileContainer,
  Content,
  Header,
  BackButton,
  ProfileInfo,
  Avatar,
  SecaoPerfilEmCima,
  Banner,
  // TweetInput,
  // TweetButton,
} from './Perfil.styles';
import { criarReply, criarTweetApi } from '../services/growTweeter-api/tweets/criar';
import { listarTweets } from '../services/growTweeter-api/tweets/listar';
import { TweetModal } from '../components/TweetModal/TweetModal';
import { TitlePerfil } from './Perfil.styles';

export function Perfil() {
  const [userTweets, setUserTweets] = useState<TweetInterface[]>([]);
  const [newTweet, setNewTweet] = useState(''); // Estado para o conteúdo do novo tweet
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UsuarioInterface | null>(null);

  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [tweetParaResponder, setTweetParaResponder] = useState<TweetInterface | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // Recupera os dados do usuário logado do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Lista os tweets e filtra apenas os do usuário logado
      listarTweets().then((tweets) => {
        const userTweets = tweets.filter(
          (tweet) => tweet.usuarioId === parsedUser.id
        );
        setUserTweets(userTweets);
      });
    }
  }, []);

  const handleCreateTweet = async () => {
    try {
      const createdTweet = await criarTweetApi({ descricao: newTweet });
      console.log('Tweet criado:', createdTweet); // Log para depuração

      setUserTweets((prevTweets) => [createdTweet, ...prevTweets]);
      setNewTweet(''); // Limpa o campo de texto após criar o tweet
      setIsModalOpen(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao criar tweet:', error);
      alert('Ocorreu um erro ao criar o tweet. Tente novamente.');
    }
  };

  const handleReply = async () => {
  if (!tweetParaResponder) return;
  try {
    const payload = {
      tweetId: tweetParaResponder.id,
      descricao: replyContent,
    };
    const createdReply = await criarReply(payload);
    // Atualiza replies do tweet na lista do perfil
    setUserTweets((prevTweets) =>
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

  const handleOpenReplyModal = (tweet: TweetInterface) => {
    setTweetParaResponder(tweet);
    setReplyContent('');
    setReplyModalOpen(true);
  };

  const userAvatar = user?.avatar || '/default_avatar.png';

  return (
    <ProfileContainer>
      <Navigate onTweetClick={() => setIsModalOpen(true)} />

      {/* Feed principal */}
      <Content>
        <Header>
          <SecaoPerfilEmCima>
            <BackButton>&larr;</BackButton>
            <TitlePerfil>
              <div className="titulo-um">
                Perfil de @{user?.email.split('@')[0] || 'username'}
              </div>
              <div className="titulo-dois">{userTweets.length} tweets</div>
            </TitlePerfil>
          </SecaoPerfilEmCima>
          <Banner>
            <ProfileInfo>
              <Avatar src={userAvatar} 
              alt="foto usuário"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = '/default_avatar.png';
              }}
              />
              <h2>{user?.nome || 'Usuário'}</h2>
              <p className="username">@{user?.email.split('@')[0] || 'username'}</p>
            </ProfileInfo>
          </Banner>
          
        </Header>
        <ListarTweets tweet={userTweets} onReplyClick={handleOpenReplyModal}/>
      </Content>

      {/* Barra lateral direita */}
      <Asside />

      {replyModalOpen && tweetParaResponder && (
        <TweetModal
          onClose={() => setReplyModalOpen(false)}
          onSubmit={handleReply}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Escreva sua resposta..."
        />
      )}

      {/* Modal para criar tweet */}
      {isModalOpen && (
        <TweetModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTweet}
          value={newTweet} // Passa o valor do tweet
          onChange={(e) => setNewTweet(e.target.value)} // Atualiza o estado do tweet
        />
      )}
    </ProfileContainer>
  );
}