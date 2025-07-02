import styled, { css } from 'styled-components';

// export const TweetContainer=styled.div` display: flex;
// padding: 5px;
// border-bottom: 1px solid #e1e8ed;
// background-color: #ffffff;
// margin-left: 10px;
// `;

export const TweetContainer = styled.div<{ tipo?: string; hasReplies?: boolean }>`
  display: flex;
  padding: 5px;
  background-color: #ffffff;
  margin-left: 10px;
  position: relative;
  width: 100%;
  ${({ tipo, hasReplies }) =>
    tipo === 'tweet' && !hasReplies
      ? 'border-bottom: 1px solid #e1e8ed;'
      : ''}
`;

export const RepliesWrapper = styled.div<{ hasReplies?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  
  
`;

export const VerticalLine = styled.div`
  width: 24px; /* largura igual ao espaço do avatar */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  margin-left: 25px;
  /* Espaço para alinhar com o avatar */
`;

export const VerticalBar = styled.div`
  width: 2px;
  height: 30px; /* altura do tracinho, ajuste conforme necessário */
  background: #e1e8ed;
  margin: 0 auto;
`;

// export const Avatar = styled.div`
//   width: 48px;
//   height: 48px;
//   margin-right: 12px;
//   img {
//     width: 48px;
//     height: 48px;
//     border-radius: 50%;
//     object-fit: cover;
//   }
// `;

export const Avatar = styled.div<{ showLine?: boolean }>`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  position: relative;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  ${({ showLine }) =>
    showLine &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 48px;
        transform: translateX(-50%);
        width: 2px;
        height: calc(100% - 48px);
        background: #e1e8ed;
      }
    `}
`;

export const ReplyContainer = styled.div<{ isLast?: boolean }>`
  display: flex;
  position: relative;
  background: #fff;
  width: 200%;
  ${({ isLast }) =>
    isLast
      ? 'border-bottom: 1px solid #e1e8ed;'
      : ''}
  &::before {
    content: '';
    display: ${({ isLast }) => (isLast ? 'none' : 'block')};
    position: absolute;
    left: 22px;
    top: 48px;
    width: 2px;
    height: calc(100% - 48px);
    background: #e1e8ed;
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