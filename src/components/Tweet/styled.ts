import styled from 'styled-components';

export const TweetContainer=styled.div` display: flex;
padding: 5px;
border-bottom: 1px solid #e1e8ed;
background-color: #ffffff;
margin-left: 10px;
`;

export const Avatar=styled.div` margin-right: 10px;

img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
}

`;

export const Content=styled.div` flex-grow: 1;
font-size: 0.8rem;
font-weight: 200;
`;

export const Header=styled.div` display: flex;
align-items: baseline;
margin-bottom: 0px;
`;

export const AuthorName=styled.span` font-weight: 600;
margin-right: 5px;
font-size: 0.9rem;
`;

export const Username=styled.span` color: #657786;
font-size: 0.9rem;
`;

export const Body=styled.p` margin-bottom: 10px;
`;

export const Actions=styled.div` display: flex;
gap: 20px;
color: #657786;
font-size: 0.9rem;

.action-item {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        color: #1da1f2;
    }

    span:first-child {
        margin-right: 5px;
    }
}

`;

export const FollowButton = styled.button<{ isFollowing: boolean }>`
  background-color: ${(props) => (props.isFollowing ? '#e1e8ed' : '#1da1f2')};
  color: ${(props) => (props.isFollowing ? '#14171a' : '#ffffff')};
  border: none;
  padding: 5px 10px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.7rem;
  margin-left: 20px;

  &:hover {
    background-color: ${(props) => (props.isFollowing ? '#d6d6d6' : '#0c85d0')};
  }
`;

export const DeleteButton = styled.div`
  color: #e0245e;
  cursor: pointer;

  &:hover {
    color: #a81c47;
  }
`;