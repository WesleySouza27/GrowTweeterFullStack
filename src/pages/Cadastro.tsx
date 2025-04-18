import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuarioApi } from '../services/growTweeter-api/cadastrar'; 
import {
  CadastroContainer,
  Form,
  Input,
  Button,
  Title,
  LinkToLogin,
} from './Cadastro.styles';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usuario = {
        nome,
        email,
        senha,
        avatar: avatar || undefined, // Avatar é opcional
      };

      await cadastrarUsuarioApi(usuario);
      alert('Usuário cadastrado com sucesso!');
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <CadastroContainer>
      <Title>Cadastro</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Input
          type="text"
          accept="Link da foto (opcional)"
          onChange={(e) => setAvatar(e.target.value)}
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
      <LinkToLogin to="/login">Já tem uma conta? Faça login</LinkToLogin>
    </CadastroContainer>
  );
}