import { api } from "../api";
import { TweetInterface } from "../../../interfaces/Interface"; // TweetInterface

// interface CreateTweetPayload {
//   descricao: string;
//   // Adicione outros campos conforme necessário (ex: tipo, parentId)
// }

interface ReplyPayload {
  descricao: string;
  tweetId: string;
}

export const criarTweetApi = async (payload: { descricao: string }): Promise<TweetInterface> => {
  try {
    const response = await api.post('/tweets', payload);
    console.log('Resposta do backend (criarTweetApi):', response.data); // Log para depuração
    return response.data; // Certifique-se de que o backend retorna { sucesso, mensagem, dados }
  } catch (error) {
    console.error('Erro ao criar tweet na API:', error);
    throw error; // Lança o erro para ser tratado no componente
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