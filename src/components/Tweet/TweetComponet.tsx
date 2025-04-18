import { TweetInterface } from '../../interfaces/Interface';
import {
  TweetContainer,
  Avatar,
  Content,
  Header,
  AuthorName,
  Username,
  Body,
  Actions,
} from './styled';
import { likeTweet, dislikeTweet } from '../../services/growTweeter-api/tweets/like_deslike'; 
import { useState } from 'react';
import default_profile from '../../assets/default_profile-6e21ba0e.png'
import iconeResposta from '../../assets/icone_responder-51a8f819.svg'
import iconeLike from '../../assets/icone_curtir-407e1295.svg'
import iconeLikeSelecionado from '../../assets/icone_curtir_selecionado-c222b3b4.svg'

interface TweetProps {
  tweet: TweetInterface;
}

export function Tweet({ tweet }: TweetProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [likes, setLikes] = useState(tweet.likes.length);
  const [liked, setLiked] = useState(
    tweet.likes.some(like => like.usuarioId === user.id)
  );

  const [likeId, setLikeId] = useState<string | null>(() => {
  const like = tweet.likes.find(like => like.usuarioId === user.id);
  return like ? like.id : null; // Define o likeId inicial com base nos likes existentes
});

  const handleLike = async () => {
  try {
    if (liked) {
      console.log('Tentando remover o like com ID:', likeId); // Log para depuração
      if (likeId) {
        await dislikeTweet(likeId); // Remove o like usando o ID do like
        setLikes(likes - 1);
        setLikeId(null); // Reseta o ID do like
      } else {
        console.error('Erro: likeId não encontrado para remover o like.');
      }
    } else {
      const response = await likeTweet(tweet.id);
      console.log('Like criado com ID:', response.data.dados.id); // Log para depuração
      setLikes(likes + 1);
      setLikeId(response.data.dados.id); // Armazena o ID do like retornado pela API
    }
    setLiked(!liked); // Alterna o estado de "liked"
  } catch (error) {
    console.error('Erro ao curtir/descurtir o tweet:', error);
    alert('Ocorreu um erro ao processar sua ação. Tente novamente mais tarde.');
  }
};

  if (!tweet.usuario) {
    return <p>Erro: Usuário não definido.</p>;
  }

  return (
    <TweetContainer>
      <Avatar>
        {tweet.usuario.avatar ? (
          <img src={tweet.usuario.avatar} alt={`${tweet.usuario.nome}'s avatar`} />
        ) : (
          <img src={default_profile} alt="Avatar padrão" />
        )}
      </Avatar>
      <Content>
        <Header>
          <AuthorName>{tweet.usuario.nome}</AuthorName>
          <Username>@{tweet.usuario.nome}  • 3h</Username>
        </Header>
        <Body>{tweet.descricao}</Body>
        <Actions>
          <div className="action-item">
            <span role="img" aria-label="Comentário">
              <img src={iconeResposta} alt="" />
            </span>
            <span>0</span>
          </div>
          <div
            className="action-item"
            onClick={handleLike}
            style={{ color: liked ? '#1da1f2' : undefined }}
          >
            <span role="img" aria-label="Curtir">
              <img
                src={liked ? iconeLikeSelecionado : iconeLike} // Alterna o ícone com base no estado "liked"
                alt={liked ? 'Curtir selecionado' : 'Curtir'}
              />
            </span>
            <span>{likes}</span>
          </div>
        </Actions>
      </Content>
    </TweetContainer>
  );
}