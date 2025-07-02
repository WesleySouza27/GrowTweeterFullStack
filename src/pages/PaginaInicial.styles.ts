import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 350px; /* Menu lateral, feed principal, barra lateral */
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f5f8fa;
`;

export const FeedContainer = styled.div`
  background: #fff;
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  width: 600px;
  min-height: 100vh;
  padding: 0;
`;

export const FeedTitle = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  font-family: karla, roboto, sans-serif;
  border-bottom: 1px solid #e1e8ed;
  padding-bottom: 15px;
  margin-top: 10px;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #ffffff;
  border-right: 1px solid #e1e8ed;
  overflow: hidden; /* Remove o scroll do menu lateral */
`;

export const AssideContainer = styled.aside`
  padding: 20px;
  background: #f5f8fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TrendingTopics = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  padding: 20px;
  width: 100%;
  max-width: 320px;
  margin-top: 20px;
`;


export const NewTweetForm = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  background-color: #f5f8fa;
`;

export const TweetInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
`;

export const TweetButton = styled.button`
  background: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 999px;
  width: 90%;
  padding: 12px 0;
  font-weight: bold;
  font-size: 16px;
  margin: 24px 0;
  cursor: pointer;
`;

export const TweetsList = styled.div`
  margin-top: 0px;
`;