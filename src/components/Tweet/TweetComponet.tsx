import { TweetInterface } from '../../interfaces/Interface';
import { TweetModal } from '../TweetModal/TweetModal';
import {
  TweetContainer,
  Avatar,
  Content,
  Header,
  AuthorName,
  Username,
  Body,
  Actions,
  FollowButton,
} from './styled';
import { likeTweet, dislikeTweet } from '../../services/growTweeter-api/tweets/like_deslike';
import { useState, useEffect } from 'react';
import default_profile from '../../assets/default_profile-6e21ba0e.png';
import iconeResposta from '../../assets/icone_responder-51a8f819.svg';
import iconeLike from '../../assets/icone_curtir-407e1295.svg';
import iconeLikeSelecionado from '../../assets/icone_curtir_selecionado-c222b3b4.svg';
import { criarReply } from '../../services/growTweeter-api/tweets/criar';
import { seguirUsuario, deixarDeSeguirUsuario, verificarSeSegue } from '../../services/growTweeter-api/tweets/follow';
import { deletarTweet } from '../../services/growTweeter-api/tweets/deletar';

interface TweetProps {
  tweet: TweetInterface;
}

export function Tweet({ tweet }: TweetProps) {
  

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes.length: 0);
  const [liked, setLiked] = useState(
  tweet.likes ? tweet.likes.some((like) => like.usuarioId === user.id) : false
);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState(tweet.replies || []);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState<string | null>(null);
  const [likeId, setLikeId] = useState<string | null>(null); 
  

  useEffect(() => {
    if (tweet && tweet.likes && tweet.replies) {
      setLikes(tweet.likes.length);
      setLiked(tweet.likes.some((like) => like.usuarioId === user.id));
      setReplies(tweet.replies);
    }
  }, [tweet, user.id]);

  useEffect(() => {
    if (user.id && tweet.usuario.id) {
      verificarSeSegue(user.id, tweet.usuario.id)
        .then((follow) => {
          if (follow) {
            setIsFollowing(true);
            setFollowId(follow.id);
          }
        })
        .catch((error) => console.error('Erro ao verificar se segue:', error));
    }
  }, [user.id, tweet.usuario.id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este tweet?');
    if (!confirmDelete) return;

    try {
      await deletarTweet(tweet.id); // Chama o serviço para deletar o tweet
      alert('Tweet deletado com sucesso!');
      // Aqui você pode implementar uma lógica para remover o tweet da lista de tweets no frontend
    } catch (error) {
      console.error('Erro ao deletar tweet:', error);
      alert('Ocorreu um erro ao deletar o tweet. Tente novamente mais tarde.');
    }
  };


  const handleReply = async () => {
    try {
      const payload = {
        tweetId: tweet.id,
        descricao: replyContent,
      };
      const createdReply = await criarReply(payload);
      console.log('Resposta criada:', createdReply);
      setReplies([...replies, createdReply]);
      setReplyContent('');
      setIsReplyModalOpen(false);
      console.log('Modal fechado e campo de input limpo.');
    } catch (error) {
      console.error('Erro ao enviar reply:', error);
      alert('Ocorreu um erro ao enviar sua resposta. Tente novamente.');
    }
  };

  const handleLike = async () => {
  try {
    if (liked) {
      // Descurtir
      if (likeId) {
        await dislikeTweet(likeId); // Remove o like usando o ID do like
        setLikes(likes - 1); // Atualiza o contador de likes
        setLikeId(null); // Reseta o ID do like
      }
    } else {
      // Curtir
      const response = await likeTweet(tweet.id); // Envia o like para o backend
      setLikes(likes + 1); // Atualiza o contador de likes
      setLikeId(response.data.dados.id); // Armazena o ID do like retornado pela API
    }
    setLiked(!liked); // Alterna o estado de "liked"
  } catch (error) {
    console.error('Erro ao curtir/descurtir o tweet:', error);
    alert('Ocorreu um erro ao processar sua ação. Tente novamente mais tarde.');
  }
};

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        if (followId) {
          await deixarDeSeguirUsuario(followId);
          setIsFollowing(false);
          setFollowId(null);
        }
      } else {
        const payload = {
          followerId: user.id,
          followingId: tweet.usuario.id,
        };
        const follow = await seguirUsuario(payload);
        setIsFollowing(true);
        setFollowId(follow.id);
      }
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir:', error);
    }
  };

  if (!tweet || !tweet.usuario || !Array.isArray(tweet.likes) || !Array.isArray(tweet.replies)) {
    return <p>Erro: Dados do tweet estão incompletos ou inválidos.</p>;
  }

  

  return (
    <>
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
            <Username>@{tweet.usuario.nome} • 3h</Username>
            <FollowButton
              isFollowing={isFollowing}
              onClick={handleFollow}
            >
              {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
            </FollowButton>
          </Header>
          <Body>{tweet.descricao}</Body>
          <Actions>
            <div className="action-item" onClick={() => setIsReplyModalOpen(true)}>
              <span role="img" aria-label="Comentário">
                <img src={iconeResposta} alt="Responder" />
              </span>
              <span>{replies.length}</span>
            </div>
            <div
              className="action-item"
              onClick={handleLike}
              style={{ color: liked ? '#1da1f2' : undefined }}
            >
              <span role="img" aria-label="Curtir">
                <img
                  src={liked ? iconeLikeSelecionado : iconeLike}
                  alt={liked ? 'Curtir selecionado' : 'Curtir'}
                />
              </span>
              <span>{likes}</span>
            </div>
            {tweet.usuario.id === user.id && ( // Exibe o botão apenas para o autor do tweet
              <div className="action-item" onClick={handleDelete}>
                <span role="img" aria-label="Deletar">
                  🗑️
                </span>
                <span>Deletar</span>
              </div>
            )}
          </Actions>
        </Content>
      </TweetContainer>

      {isReplyModalOpen && (
        <TweetModal
          onClose={() => setIsReplyModalOpen(false)}
          onSubmit={handleReply}
          placeholder="Escreva sua resposta..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
      )}
    </>
  );
}