// growtweeter/src/services/growTweeter-api/auth/index.ts
// Este arquivo pode agrupar todas as chamadas relacionadas à autenticação

import { api } from "../api";
import { UsuarioInterface } from "../../../interfaces/Interface";

// interface LoginPayload {
//   email: string;
//   senha: string;
// }

// interface LoginResponse {
//   token: string;
//   usuario: Omit<UsuarioInterface, 'senha'>;
// }

interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
}


// src/services/growTweeter-api/auth/index.ts
export async function loginUser(payload: { email: string; password: string }) {
  try {
    const response = await api.post(`/usuarios/login`, payload);
    //return response.data.dados // Certifique-se de que o backend retorna { token, usuario }
    return response.data.dados as UsuarioResponse; // Ajuste conforme a estrutura de resposta do seu backend
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const createUser = async (payload: Omit<UsuarioInterface, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<UsuarioInterface | undefined> => {
  try {
    const response = await api.post('/usuarios', payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

// Adicione outras funções de autenticação conforme necessário (ex: logout)