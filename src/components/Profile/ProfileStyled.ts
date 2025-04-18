import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 250px auto 300px; /* Menu lateral, feed principal, barra lateral */
  min-height: 100vh;
  background-color: #f5f8fa;
  overflow: hidden; /* Remove o scroll geral da página */
`;


export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #1da1f2;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  height: 100vh;
  overflow-y: auto; /* Permite scroll apenas no feed */
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #ffffff;
  border-right: 1px solid #e1e8ed;
`;

export const AssideContainer = styled.div`
  padding: 20px;
  background-color: #f5f8fa;
  height: 100vh;
  border-left: 1px solid #e1e8ed;
`;


export const ProfileInfo = styled.div`
  text-align: center;
`;

export const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 5px 0;
`;

export const Username = styled.p`
  font-size: 1rem;
  color: #657786;
`;

export const TweetsContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const Tweet = styled.div`
  padding: 15px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

export const TweetContent = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
`;

export const TweetLikes = styled.span`
  font-size: 0.9rem;
  color: #657786;
`;