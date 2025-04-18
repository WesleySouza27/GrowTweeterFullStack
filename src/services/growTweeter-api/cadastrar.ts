import { api } from '../growTweeter-api/api';

interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
}

export const cadastrarUsuarioApi = async (usuario: UsuarioCadastro) => {
  return api.post('/usuarios', usuario);
};