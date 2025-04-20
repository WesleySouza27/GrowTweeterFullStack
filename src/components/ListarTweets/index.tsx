import { TweetInterface } from "../../interfaces/Interface";
import { Tweet } from "../Tweet/TweetComponet";
import { TweetListContainer,} from './styles.' //  TweetListItem 
import { ErrorBoundary } from "../ErrorBoundary"; 

interface ListaTweetsProps {
  tweet: TweetInterface[];
}

export function ListarTweets({ tweet }: ListaTweetsProps) {
  console.log('Tweets recebidos pelo ListarTweets:', tweet);

  if (!Array.isArray(tweet) || tweet.length === 0) {
    return <p>Carregando tweets...</p>;
  }

  return (
    <TweetListContainer>
      {tweet
        .filter((t) => t && t.usuario && t.usuario.id) // Filtra tweets inválidos
        .map((tweet) => (
          <ErrorBoundary key={tweet.id}>
            <Tweet tweet={tweet} />
          </ErrorBoundary>
        ))}
    </TweetListContainer>
  );
}