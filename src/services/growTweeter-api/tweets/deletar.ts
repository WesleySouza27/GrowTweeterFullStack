import { api } from '../api';

export const deletarTweet = async (tweetId: string) => {
  try {
    await api.delete(`/tweets/${tweetId}`);
  } catch (error) {
    console.error('Erro ao deletar tweet:', error);
    throw error;
  }
};