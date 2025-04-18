import { Actions, TweetContainer } from '../../../components/Tweet/styled';
import { likeTweet, dislikeTweet } from './like_deslike';
import { useState } from 'react';

interface Like {
  usuarioId: string; // ID do usuário que curtiu
}

interface Tweet {
  id: string; // ID do tweet
  likes: Like[]; // Lista de likes
}

interface TweetProps {
  tweet: Tweet; // Propriedade tweet
}

export function Tweet({ tweet }: TweetProps) {
  const [likes, setLikes] = useState(tweet.likes.length);
  const [liked, setLiked] = useState(
    tweet.likes.some((like: Like) => like.usuarioId === localStorage.getItem('userId'))
  );

  const handleLike = async () => {
    if (liked) {
      await dislikeTweet(tweet.id);
      setLikes(likes - 1);
    } else {
      await likeTweet(tweet.id);
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <TweetContainer>
      {/* ...outros elementos */}
      <Actions>
        <div className="action-item" onClick={handleLike} style={{ color: liked ? '#1da1f2' : undefined }}>
          <span role="img" aria-label="Curtir">❤️</span>
          <span>{likes}</span>
        </div>
      </Actions>
    </TweetContainer>
  );
}