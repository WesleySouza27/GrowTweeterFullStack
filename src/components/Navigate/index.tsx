import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Logo,
  NavLinks,
  NavItem,
  NavLink,
  TweetButton,
  UserInfo,
  // AvatarPlaceholder,
  // Username,
  // LogoutLink,
  UserCard,
  UserAvatar,
} from './styled';

import logo_growtweet from '../../assets/logo_growtweet-222727c3.svg'
import explorar from '../../assets/icone_explorar-d8e2a80e.svg'
import explorarSelecionado from '../../assets/icone_explorar_selecionado.svg'
import perfil from '../../assets/icone_perfil-39ec16d6.svg'
import perfilSelecionado from '../../assets/icone_perfil_selecionado.svg'
import iconeInicial from '../../assets/icone_pagina inicial.svg'
import iconeInicialSelecionado from '../../assets/icone_pagina inicial_selecionado.svg'

export interface NavigateProps {
  onTweetClick: () => void; // Prop para abrir o modal
}

export function Navigate({ onTweetClick }: NavigateProps) {
  const location = useLocation(); // Obtém a rota atual
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Obtém os dados do usuário do localStorage

  function handleLogout() {
    localStorage.removeItem('authToken'); // Remove o token do localStorage
    localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
    window.location.href = '/login'; // Redireciona para a página de login
  }

  return (
    <Container>
      <Logo>
        <img src={logo_growtweet} alt="GrowTweet Logo" />
      </Logo>
      <NavLinks>
        <NavItem>
          <NavLink as={Link} to="/">
            <img
              src={location.pathname === '/' ? iconeInicialSelecionado : iconeInicial}
              alt="icone inicial"
            />
            <span role="img" aria-label="Página Inicial">Página Inicial</span> 
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/explore">
            <img
              src={location.pathname === '/explore' ? explorarSelecionado : explorar}
              alt="icone explorar"
            />
            <span role="img" aria-label="Explorar">Explorar</span> Explorar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/perfil">
            <img
              src={location.pathname === '/perfil' ? perfilSelecionado : perfil}
              alt="icone perfil"
            />
            <span role="img" aria-label="Perfil">Perfil</span>
          </NavLink>
        </NavItem>
      </NavLinks>
      <TweetButton onClick={onTweetClick}>Tweetar</TweetButton>
      <UserCard>
        <UserAvatar src={user?.avatar || '/default-avatar.png'} alt="Avatar" />
        <UserInfo>
          <p className="name">{user?.nome || 'Usuário'}</p>
          <p className="username">@{user?.email.split('@')[0] || 'username'}</p>
          <span className="logout" onClick={handleLogout}>
            Sair
          </span>
        </UserInfo>
      </UserCard>
    </Container>
  );
}