import { TweetInterface } from "../../interfaces/Interface";
import { Tweet } from "../Tweet/TweetComponet";
import { TweetListContainer, TweetListItem } from './styles.'

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
      {tweet.map((tweet) => (
        <TweetListItem key={tweet.id}>
          <Tweet tweet={tweet} />
        </TweetListItem>
      ))}
    </TweetListContainer>
  );
}