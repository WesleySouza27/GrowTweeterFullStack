import React, { useState, useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  TweetForm,
  TweetInput,
  TweetButton,
} from './TweetModalStyled';
import avatarLogo from '../../assets/default_profile-6e21ba0e.png';
import { UserAvatar } from '../Navigate/styled';

interface TweetModalProps {
  onClose: () => void; // Fecha o modal
  onSubmit: (descricao: string) => void; // Envia o tweet
}

export function TweetModal({ onClose, onSubmit }: TweetModalProps) {
  const [tweetText, setTweetText] = useState('');
  const [userAvatar, setUserAvatar] = useState<string>(avatarLogo);


  useEffect(() => {
    // Recupera o avatar do usuário logado do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserAvatar(user.avatar || avatarLogo); // Usa o avatar do usuário ou a imagem padrão
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (tweetText.trim()) {
      onSubmit(tweetText);
      setTweetText('');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>O que está acontecendo?</h2>
        <TweetForm onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserAvatar src={userAvatar} alt="Avatar do usuário" />
            <TweetInput
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              placeholder="Digite seu tweet aqui..."
              maxLength={280}
              required
            />
          </div>
          <TweetButton type="submit">Tweetar</TweetButton>
        </TweetForm>
      </ModalContent>
    </ModalOverlay>
  );
}