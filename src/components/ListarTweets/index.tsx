import { TweetInterface } from "../../interfaces/Interface";
import { Tweet } from "../Tweet/TweetComponet";
import { TweetListContainer } from './styles.'; 
import { ErrorBoundary } from "../ErrorBoundary"; 

interface ListaTweetsProps {
  tweet: TweetInterface[];
  onReplyClick?: (tweet: TweetInterface) => void; // NOVO
}

export function ListarTweets({ tweet, onReplyClick }: ListaTweetsProps) {
  if (!Array.isArray(tweet) || tweet.length === 0) {
    return <p>Carregando tweets...</p>;
  }

  return (
    <TweetListContainer>
      {tweet
        .filter((t)  => t.tipo === 'tweet')
        .map((tweet) => (
          <ErrorBoundary key={tweet.id}>
            <Tweet tweet={tweet} onReplyClick={onReplyClick} />
          </ErrorBoundary>
        ))}
    </TweetListContainer>
  );
}