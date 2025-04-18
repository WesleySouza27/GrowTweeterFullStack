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
  // TweetInput,
  // TweetButton,
} from './Perfil.styles';
import { criarTweetApi } from '../services/growTweeter-api/tweets/criar';
import avatarLogo from '../assets/default_profile-6e21ba0e.png'
import { TweetModal } from '../components/TweetModal/TweetModal';

export function Perfil() {
  const [userTweets, setUserTweets] = useState<TweetInterface[]>([]);
  const [newTweet, setNewTweet] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UsuarioInterface | null>(null);

  useEffect(() => {
    // Recupera os dados do usuário logado do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCreateTweet = async () => {
    try {
      const createdTweet = await criarTweetApi({ descricao: newTweet });
      setUserTweets((prevTweets) => [createdTweet, ...prevTweets]);
      setNewTweet('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar tweet:', error);
    }
  };


  // precisa importar/capturar a foto do usuario logado para usar no perfil e nos tweets

  const userAvatar = user?.avatar || avatarLogo;


  return (
    <ProfileContainer>
      <Navigate onTweetClick={() => setIsModalOpen(true)} />

      {/* Feed principal */}
      <Content>
        <Header>
          <BackButton>&larr; Voltar</BackButton>
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
        />
      )}
    </ProfileContainer>
  );
}