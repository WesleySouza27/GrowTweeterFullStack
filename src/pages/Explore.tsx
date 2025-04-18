import { Navigate } from '../components/Navigate';
import { Asside } from '../components/Asside';
import { trendingTopics } from '../constants/trendingTopics';
import { PageContainer } from '../configs/global/globalStyles';

export function Explore() {
  return (
    <PageContainer className="explore-page-container">
      <Navigate onTweetClick={() => {}}/>
      <main className="explore-content">
        <h1>Explorar</h1>
        <div className="trending-topics-list">
          <h2>Assuntos do momento</h2>
          <ul>
            {trendingTopics.map((topic, idx) => <li key={idx}>{topic.label}{topic.title}</li>)}
          </ul>
        </div>
      </main>
      <Asside />
    </PageContainer>
  );
}