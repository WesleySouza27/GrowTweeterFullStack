import { api } from "../api";
import { TweetInterface } from "../../../interfaces/Interface";

interface ReplyPayload {
  descricao: string;
  tweetId: string;
}

export const criarTweetApi = async (payload: { descricao: string }): Promise<TweetInterface> => {
  try {
    const response = await api.post('/tweets', payload);
    return response.data; 
  } catch (error) {
    console.error('Erro ao criar tweet na API:', error);
    throw error; 
  }
};

export const criarReply = async (payload: ReplyPayload) => {
  try {
    const response = await api.post(`/tweets/${payload.tweetId}/reply`, {
      descricao: payload.descricao,
    });
    return response.data.dados; // Retorna os dados da reply criada
  } catch (error) {
    console.error('Erro ao criar reply:', error);
    throw error;
  }
};