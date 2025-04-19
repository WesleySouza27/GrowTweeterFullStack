import { api } from '../api';

interface FollowPayload {
  followerId: string;
  followingId: string;
}

// Função para seguir um usuário
export const seguirUsuario = async (payload: FollowPayload) => {
  try {
    const response = await api.post('/follows', payload);
    return response.data.dados; // Retorna os dados do follow criado
  } catch (error) {
    console.error('Erro ao seguir usuário:', error);
    throw error;
  }
};

// Função para deixar de seguir um usuário
export const deixarDeSeguirUsuario = async (followId: string) => {
  try {
    await api.delete(`/follows/${followId}`);
  } catch (error) {
    console.error('Erro ao deixar de seguir usuário:', error);
    throw error;
  }
};

// Função para verificar se um usuário já segue outro
export const verificarSeSegue = async (followerId: string, followingId: string) => {
  try {
    const response = await api.get(`/follows/${followerId}/${followingId}`);
    return response.data.dados; // Retorna os dados do follow, se existir
  } catch (error) {
    console.error('Erro ao verificar se segue:', error);
    throw error;
  }
};