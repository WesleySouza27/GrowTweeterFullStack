import { trendingTopics } from '../../constants/trendingTopics';
import { AssideContainer, TrendingTopics, ShowMoreButton } from './styled';

export function Asside() {
  return (
    <AssideContainer>
      <TrendingTopics>
        <h2>O que está acontecendo?</h2>
        <ul>
          {trendingTopics.map((topic, idx) => (
            <li key={idx}>
              <p className="wh-label">{topic.label}</p>
              <p className="wh-title">{topic.title}</p>
            </li>
          ))}
        </ul>
        <ShowMoreButton>Mostrar mais</ShowMoreButton>
      </TrendingTopics>
    </AssideContainer>
  );
}