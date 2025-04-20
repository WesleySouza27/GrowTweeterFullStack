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
  // TweetInput,
  // TweetButton,
} from './Perfil.styles';
import { criarTweetApi } from '../services/growTweeter-api/tweets/criar';
import { listarTweets } from '../services/growTweeter-api/tweets/listar';
import avatarLogo from '../assets/default_profile-6e21ba0e.png'
import { TweetModal } from '../components/TweetModal/TweetModal';
import { TitlePerfil } from './Perfil.styles';

export function Perfil() {
  const [userTweets, setUserTweets] = useState<TweetInterface[]>([]);
  const [newTweet, setNewTweet] = useState(''); // Estado para o conteúdo do novo tweet
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UsuarioInterface | null>(null);

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

  const userAvatar = user?.avatar || avatarLogo;

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
          <Avatar src={userAvatar} alt="foto usuário" />
          <ProfileInfo>
            <h2>{user?.nome || 'Usuário'}</h2>
            <p className="username">@{user?.email.split('@')[0] || 'username'}</p>
          </ProfileInfo>
        </Header>
        <ListarTweets tweet={userTweets} />
      </Content>

      {/* Barra lateral direita */}
      <Asside />

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