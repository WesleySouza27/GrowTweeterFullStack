import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 230px auto 480px; /* Menu lateral, feed principal, barra lateral */
  min-height: 100vh;
  background-color: #f5f8fa;
  padding-left: 50px;
`;

export const FeedContainer = styled.div`
  background-color: #ffffff;
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  width: 600px;
  height: 100vh;
  overflow-y: auto; /* Permite scroll apenas no feed */
  font-family: karla, roboto, sans-serif;
`;

export const FeedTitle = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  margin: 20px 0 20px 10px;
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

export const AssideContainer = styled.div`
  padding: 20px;
  background-color: #f5f8fa;
  height: 100vh;
  border-left: 1px solid #e1e8ed;
  overflow: hidden; /* Remove o scroll do Asside */
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
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0c85d0;
  }
`;

export const TweetsList = styled.div`
  margin-top: 0px;
`;