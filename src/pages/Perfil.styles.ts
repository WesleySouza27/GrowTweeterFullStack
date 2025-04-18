import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 230px auto 480px; /* Menu lateral, feed principal, barra lateral */
  max-width: 1200px; /* Define a largura máxima */
  margin: 0 auto; /* Centraliza a página */
  min-height: 100vh;
  background-color: #ffffff;
`;

export const Content = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  height: 100vh;
  overflow-y: auto; /* Permite scroll apenas no feed */
  width: 600px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  align-self: flex-start;
  flex-direction: column;
  background: none;
  border: none;
  font-size: 1.3rem;
  color:rgb(18, 24, 27);
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 15px;

  &:hover {
    text-decoration: none;
    color:#1da1f2;
  }
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #1da1f2;
  object-fit: cover;
  margin: 50px 0 0 0;
  margin-right: auto;
  align-items: flex-start;
`;

export const ProfileInfo = styled.div`
  text-align: start;
  margin-right: auto;

  h2 {
    font-size: 1rem;
    margin: 0;
  }

  .username {
    font-size: 1.2rem;
    color: #657786;
  }
`;

export const TweetInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
`;

export const TweetButton = styled.button`
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0d8de1;
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: right;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 20px;
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }

  .logout {
    font-size: 0.9rem;
    color: #1da1f2;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TitlePerfil = styled.div`
  text-align: start;
  margin-bottom: 20px;

  .titulo-um {
    font-size: 0.8rem;
    font-weight: 600;
    color: #14171a;
    margin-bottom: 5px;
  }

  .titulo-dois {
    font-size: 0.7rem;
    color: #657786;
  }
`;

export const SecaoPerfilEmCima = styled.div`
  display: flex;
  margin-right: auto;
  flex-direction: row;
`