import { useState, useEffect } from 'react';
import { TweetInterface, UsuarioInterface } from '../../interfaces/Interface';
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
  RepliesWrapper,
  ReplyContainer,
} from './styled';
import { likeTweet, dislikeTweet } from '../../services/growTweeter-api/tweets/like_deslike';
import iconeResposta from '../../assets/icone_responder-51a8f819.svg';
import iconeLike from '../../assets/icone_curtir-407e1295.svg';
import iconeLikeSelecionado from '../../assets/icone_curtir_selecionado-c222b3b4.svg';
import {
  seguirUsuario,
  deixarDeSeguirUsuario,
  verificarSeSegue,
} from '../../services/growTweeter-api/tweets/follow';
import { deletarTweet } from '../../services/growTweeter-api/tweets/deletar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { VerticalLine, VerticalBar } from './styled';
import { AxiosError } from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

async function buscarUsuarioPorIdOtimizado(usuarioId: string, tweetUsuario: UsuarioInterface): Promise<UsuarioInterface> {
  if (usuarioId === tweetUsuario.id) return tweetUsuario;
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/${usuarioId}`);
    if (!response.ok) return {
      id: usuarioId, nome: 'Desconhecido', email: '', senha: '', avatar: undefined, criadoEm: '', atualizadoEm: ''
    };
    return await response.json();
  } catch {
    return {
      id: usuarioId, nome: 'Desconhecido', email: '', senha: '', avatar: undefined, criadoEm: '', atualizadoEm: ''
    };
  }
}

interface TweetProps {
  tweet: TweetInterface;
  isReply?: boolean;
  onReplyClick?: (tweet: TweetInterface) => void; // NOVO: função para abrir modal global
}

type RawReply = {
  id: string;
  descricao: string;
  tipo: string;
  usuarioId: string;
  criadoEm: string;
  atualizadoEm: string;
  parentId: string;
};

type ReplyType = TweetInterface | RawReply;

function isTweetInterface(obj: unknown): obj is TweetInterface {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'usuario' in obj &&
    'likes' in obj &&
    Array.isArray((obj as TweetInterface).likes)
  );
}

async function enrichReply(raw: RawReply, tweetUsuario: UsuarioInterface): Promise<TweetInterface> {
  const usuario = await buscarUsuarioPorIdOtimizado(raw.usuarioId, tweetUsuario);
  return { ...raw, usuario, likes: [], replies: [] };
}

function AsyncReply({ rawReply, tweetUsuario }: { rawReply: RawReply, tweetUsuario: UsuarioInterface }) {
  const [enriched, setEnriched] = useState<TweetInterface | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    enrichReply(rawReply, tweetUsuario)
      .then(setEnriched)
      .catch(() => setErro(true));
  }, [rawReply, tweetUsuario]);

  if (erro) return <div>Erro ao carregar resposta.</div>;
  if (!enriched)
    return <span style={{ color: '#657786', fontSize: '0.8rem' }}>Carregando resposta...</span>;
  return <Tweet tweet={enriched} isReply={true} />;
}

export function Tweet({ tweet, isReply = false, onReplyClick }: TweetProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes.length : 0);
  const [liked, setLiked] = useState(
    tweet.likes ? tweet.likes.some((like) => like.usuarioId === user.id) : false
  );
  const [replies, setReplies] = useState<ReplyType[]>(tweet.replies ?? []);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState<string | null>(null);
  const [likeId, setLikeId] = useState<string | null>(null);

  useEffect(() => {
    setLikes(tweet.likes ? tweet.likes.length : 0);
    setLiked(tweet.likes ? tweet.likes.some((like) => like.usuarioId === user.id) : false);
    setReplies(tweet.replies ?? []);
  }, [tweet, user.id]);

  useEffect(() => {
  if (user.id && tweet.usuario.id) {
    verificarSeSegue(user.id, tweet.usuario.id)
      .then((res) => {
        console.log('verificarSeSegue:', res); // <-- Adicione este log
        setIsFollowing(!!res.segue);
        setFollowId(res.id || null);
      })
      .catch((error) => console.error('Erro ao verificar se segue:', error));
    }
  }, [user.id, tweet.usuario.id]);

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este tweet?')) return;
    try {
      await deletarTweet(tweet.id);
      alert('Tweet deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar tweet:', error);
      alert('Ocorreu um erro ao deletar o tweet. Tente novamente mais tarde.');
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        if (likeId) {
          await dislikeTweet(likeId);
          setLikes((prev) => prev - 1);
          setLikeId(null);
        }
      } else {
        const response = await likeTweet(tweet.id);
        setLikes((prev) => prev + 1);
        setLikeId(response.data.dados.id);
      }
      setLiked((prev) => !prev);
    } catch (error) {
      console.error('Erro ao curtir/descurtir o tweet:', error);
      alert('Ocorreu um erro ao processar sua ação. Tente novamente mais tarde.');
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        if (window.confirm('Tem certeza que deseja deixar de seguir este usuário?')) {
          if (followId) {
            await deixarDeSeguirUsuario(followId);
            const res = await verificarSeSegue(user.id, tweet.usuario.id);
            setIsFollowing(!!res.segue);
            setFollowId(res.id || null);
            console.log('verificarSeSegue ******:', res);
          } else {
            alert('Não foi possível encontrar o ID do follow para deixar de seguir.');
          }
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
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      if (error?.response?.status === 404) {
        setIsFollowing(false);
        setFollowId(null);
        return;
      }
      alert(error?.response?.data?.message || 'Erro ao seguir/deixar de seguir.');
      console.error('Erro ao seguir/deixar de seguir:', error);
    }
  };

  if (
    !tweet ||
    !tweet.usuario ||
    !Array.isArray(tweet.likes) ||
    !Array.isArray(tweet.replies)
  ) {
    return <p>Erro: Dados do tweet estão incompletos ou inválidos.</p>;
  }

  const renderReplies = () =>
  replies.length > 0 && (
    <RepliesWrapper>
      {replies.map((reply, idx) => (
        <div key={reply.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <VerticalLine>
            <VerticalBar />
          </VerticalLine>
          <div style={{ flex: 1 }}>
            <ReplyContainer isLast={idx === replies.length - 1}>
              {isTweetInterface(reply)
                ? <Tweet tweet={reply} isReply={true} onReplyClick={onReplyClick} />
                : <AsyncReply rawReply={reply as RawReply} tweetUsuario={tweet.usuario} />}
            </ReplyContainer>
          </div>
        </div>
      ))}
    </RepliesWrapper>
  );

  return (
    <>
      <TweetContainer tipo={isReply ? undefined : "tweet"} hasReplies={replies.length > 0}>
        <Avatar>
          <img
            src={tweet.usuario.avatar || '/default_avatar.png'}
            alt="Avatar"
            onError={e => {
              (e.currentTarget as HTMLImageElement).src = '/default_avatar.png';
            }}
          />
        </Avatar>
        <Content>
          <Header>
            <AuthorName>{tweet.usuario.nome}</AuthorName>
            <Username>@{tweet.usuario.nome} • 3h</Username>
            {!isReply && user.id !== tweet.usuario.id && (
              <FollowButton isFollowing={isFollowing} onClick={handleFollow}>
                {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
              </FollowButton>
            )}
          </Header>
          <Body>{tweet.descricao}</Body>
          <Actions>
            {!isReply && onReplyClick && (
              <div className="action-item" onClick={() => onReplyClick(tweet)}>
                <span role="img" aria-label="Comentário">
                  <img src={iconeResposta} alt="Responder" />
                </span>
                <span>{replies.length}</span>
              </div>
            )}
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
            {tweet.usuario.id === user.id && (
              <div className="action-item" onClick={handleDelete}>
                <span role="img" aria-label="Deletar">
                  <DeleteOutlineIcon style={{ fontSize: 15, color: '#e0245e' }} />
                </span>
              </div>
            )}
          </Actions>
        </Content>
      </TweetContainer>
      {!isReply && renderReplies()}
    </>
  );
}