// growtweeter/src/services/growTweeter-api/api.ts
import axios from 'axios';

// Defina a URL base da sua API backend
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3030';// Substitua pela URL real do seu backend

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Você pode adicionar outros headers padrão aqui, como tokens de autenticação
  },
});

// Interceptor para adicionar o token JWT nas requisições (se estiver logado)
api.interceptors.request.use(
  (config) => {
    // Verifique se a URL não é a de login
    if (config.url && !config.url.includes('/usuarios/login')) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros de resposta (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui você pode tratar erros globais da API, como redirecionar para página de login em caso de 401
    return Promise.reject(error);
  }
);