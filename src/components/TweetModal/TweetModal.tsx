import React, { useState, useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  TweetForm,
  TweetInput,
  TweetButton,
} from './TweetModalStyled';
import { UserAvatar } from '../Navigate/styled';

interface TweetModalProps {
  onClose: () => void;
  onSubmit: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export function TweetModal({ onClose, onSubmit, value, onChange, placeholder }: TweetModalProps) {
  const [userAvatar, setUserAvatar] = useState<string>('/default_avatar.png');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserAvatar(user.avatar || '/default_avatar.png'); // Usa o avatar do usuário ou a imagem padrão
      }
    } catch (error) {
      console.error('Erro ao carregar avatar do usuário:', error);
      setUserAvatar('/default_avatar.png'); // Usa o avatar padrão em caso de erro
    }
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{placeholder || 'O que está acontecendo?'}</h2>
        <TweetForm
          onSubmit={(e) => {
            e.preventDefault();
            try {
              onSubmit();
            } catch (error) {
              console.error('Erro ao enviar o tweet:', error);
              alert('Ocorreu um erro ao enviar o tweet. Tente novamente.');
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserAvatar
              src={userAvatar}
              alt="Avatar do usuário"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = '/default_avatar.png';
              }}
            />
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
            <TweetButton
              type="button"
              onClick={onClose}
              style={{ backgroundColor: '#e1e8ed', color: '#14171a' }}
            >
              Cancelar
            </TweetButton>
          </div>
        </TweetForm>
      </ModalContent>
    </ModalOverlay>
  );
}