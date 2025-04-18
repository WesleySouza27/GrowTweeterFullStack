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
export const loginUser = async (payload: { email: string; password: string }): Promise<{ token: string; usuario: UsuarioResponse }> => {
  try {
    const response = await api.post('/usuarios/login', payload);
    console.log('Resposta do backend:', response.data); // Adicione este log para depuração
    return response.data.dados // Certifique-se de que o backend retorna { token, usuario }
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