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
  onClose: () => void;
  onSubmit: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export function TweetModal({ onClose, onSubmit, value, onChange, placeholder }: TweetModalProps) {
  const [userAvatar, setUserAvatar] = useState<string>(avatarLogo);


  useEffect(() => {
    // Recupera o avatar do usuário logado do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserAvatar(user.avatar || avatarLogo); // Usa o avatar do usuário ou a imagem padrão
    }
  }, []);


  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{placeholder || 'O que está acontecendo?'}</h2>
        <TweetForm onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserAvatar src={userAvatar} alt="Avatar do usuário" />
            <TweetInput
              value={value}
              onChange={onChange}
              placeholder={'Digite sua resposta...'}
              maxLength={280}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <TweetButton type="submit">Enviar</TweetButton>
            <TweetButton type="button" onClick={onClose} style={{ backgroundColor: '#e1e8ed', color: '#14171a' }}>
              Cancelar
            </TweetButton>
          </div>
        </TweetForm>
      </ModalContent>
    </ModalOverlay>
  );
}