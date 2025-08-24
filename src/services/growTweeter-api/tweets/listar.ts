import { api } from "../api";
import { TweetInterface } from "../../../interfaces/Interface";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

export async function listarFeed(token: string) {
  const res = await fetch(`${API_URL}/tweets/feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar feed');
  return res.json().then((data) => data.dados);
}
