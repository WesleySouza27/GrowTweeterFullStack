import { api } from "../api"; 

// Função para curtir um tweet
export const likeTweet = async (tweetId: string) => {
  const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
  return api.post(`/likes`, { usuarioId: userId, tweetId });
};

// Função para remover a curtida de um tweet
export const dislikeTweet = async (likeId: string) => {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage
  return api.delete(`/likes/${likeId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho Authorization
    },
  });
};