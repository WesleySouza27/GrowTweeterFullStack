// growtweeter/src/services/growTweeter-api/tweets/listar.ts
import { api } from "../api";
import { TweetInterface } from "../../../interfaces/Interface";

export const listarTweets = async (): Promise<TweetInterface[]> => {
  try {
    const response = await api.get('/tweets');
    console.log('Resposta do backend (tweets):', response.data); // Log para depuração
    return response.data.dados; // Certifique-se de que "dados" contém os tweets
  } catch (error) {
    console.error("Erro ao listar tweets:", error);
    throw error;
  }
};

export async function listarFeed(token: string) {
  const res = await fetch('http://localhost:3030/tweets/feed', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar feed');
  return res.json().then((data) => data.dados);
}
