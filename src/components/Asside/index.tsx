import { trendingTopics } from '../../constants/trendingTopics';
import { AssideContainer, TrendingTopics, ShowMoreButton } from './styled';
import { Link } from 'react-router-dom';

export function Asside() {
  return (
    <AssideContainer>
      <TrendingTopics>
        <h2>O que está acontecendo?</h2>
        <ul>
          {trendingTopics.slice(0, 4).map((topic, idx) => (
            <li key={idx}>
              <p className="wh-label">{topic.label}</p>
              <p className="wh-title">{topic.title}</p>
            </li>
          ))}
        </ul>
        <Link to="/explore">
          <ShowMoreButton>Mostrar mais</ShowMoreButton>
        </Link>
      </TrendingTopics>
    </AssideContainer>
  );
}