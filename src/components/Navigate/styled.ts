import styled from 'styled-components';

export const Container=styled.nav` width: 250px;
padding: 20px;
display: flex;
flex-direction: column;
height: 100vh;
border-right: 1px solid #e1e8ed;
background-color: #ffffff;
`;

export const Logo=styled.div` font-size: 1rem;
font-weight: bold;
margin: -5px 0px 0px 42px;
color: #1da1f2;

  img {
    width: 90px;
  }
`;

export const NavLinks=styled.ul` list-style: none;
padding: 0;
left: auto;
margin-left: 30px;
margin-bottom: 5px;
`;

export const NavItem=styled.li` margin-bottom: 0px;
  padding: 0px;
`;

export const NavLink=styled.a` text-decoration: none;
color: #14171a;
display: flex;
align-items: center;
padding: 8px 12px;
border-radius: 20px;
font-weight: 300;

&:hover {
  background-color: #e8f5fd;
}

span {
  margin-right: 10px;
}

img {
  margin-right: 8px;
}

`;

export const TweetButton=styled.button` background-color: #1da1f2;
color: white;
border: none;
padding: 8px 10px;
border-radius: 25px;
cursor: pointer;
font-weight: bold;
margin-bottom: 20px;
width: 150px;
margin-left: 40px;

&:hover {
  background-color: #0c85d0;
}

`;

export const AvatarPlaceholder=styled.div` width: 50px;
height: 50px;
border-radius: 50%;
background-color: #ccc;
margin-bottom: 5px;
`;

export const Username=styled.div` font-weight: bold;
margin-bottom: 5px;
`;

export const LogoutLink=styled.a` color: #1da1f2;
text-decoration: none;
font-weight: bold;

&:hover {
  text-decoration: underline;
}

`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  height: 100vh;
  border-right: 1px solid #e1e8ed;
`;

export const MenuItem = styled.a`
  font-size: 1rem;
  color: #1da1f2;
  margin-bottom: 15px;
  text-decoration: none;

  &:hover {
  text-decoration: underline;
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: transparent; /* Sem borda destacada */
  position: fixed;
  bottom: 20px;
  left: 21vw;
  width: 250px;

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
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
  }

  .username {
    font-size: 0.8rem;
    color: #657786;
    margin: 0;
  }

  .logout {
    font-size: 0.8rem;
    color: #1da1f2;
    cursor: pointer;
    text-decoration: none;
    margin-top: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;