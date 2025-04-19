import { api } from "../api";
import { TweetInterface } from "../../../interfaces/Interface";

interface CreateTweetPayload {
  descricao: string;
  // Adicione outros campos conforme necessário (ex: tipo, parentId)
}

interface ReplyPayload {
  descricao: string;
  tweetId: string;
}

export async function criarTweetApi(data: CreateTweetPayload): Promise<TweetInterface> {
  try {
    const response = await api.post('/tweets', data);
    console.log('Tweet criado:', response.data);
    return {
      ...response.data,
      usuario: response.data.usuario || { id: '', nome: 'Usuário Desconhecido', email: '', avatar: '', criadoEm: '', atualizadoEm: '' },
    };
  } catch (error) {
    console.error("Erro ao criar tweet:", error);
    throw error;
  }
}

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