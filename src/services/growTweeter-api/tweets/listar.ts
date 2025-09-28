
import { api } from "../api";
import { TweetInterface } from "../../../interfaces/Interface";

export const listarTweets = async (): Promise<TweetInterface[]> => {
  try {
    const response = await api.get('/tweets');
    console.log('Resposta do backend (tweets):', response.data);
    return response.data.dados;
  } catch (error) {
    console.error("Erro ao listar tweets:", error);
    throw error;
  }
};

export async function listarFeed() {
  try {
    const response = await api.get('/tweets/feed');
    return response.data.dados;
  } catch (error) {
    console.error("Erro ao buscar feed:", error);
    throw error;
  }
}
