import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT nas requisições (se estiver logado)
api.interceptors.request.use(
  (config) => {
    if (config.url && !config.url.includes('/usuarios/login')) {
      const token = localStorage.getItem('auth_Token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com erros de resposta (corrigido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401
    ) {
      // Remove token inválido e redireciona para login
      localStorage.removeItem('auth_Token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);