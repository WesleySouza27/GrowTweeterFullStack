import styled from 'styled-components';


// Styled Components
export const TweetListContainer = styled.ul`
  list-style: none;
  padding: 0;
  /* margin-top: 150px; */
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 0;
  border-top: 1px solid #e1e8ed;

  /* &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  } */
  &::-webkit-scrollbar-width {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e1e8ed;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const TweetListItem=styled.li` margin-bottom: 25px;`;