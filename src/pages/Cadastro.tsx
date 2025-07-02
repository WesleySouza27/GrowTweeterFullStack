import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuarioApi } from '../services/growTweeter-api/cadastrar'; 
import {
  CadastroContainer,
  Title,
  LinkToLogin,
} from './Cadastro.styles';
import {
  LoginLeftSide,
  LoginRightSide,
  LoginForm,
  FormGroup,
  LoginButton,
  ErrorMessage,
} from './Login.styles';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
    <CadastroContainer style={{ flexDirection: 'row', minHeight: '100vh', padding: 0 }}>
      <LoginLeftSide style={{ minHeight: '100vh'}}>
        <h1 className="growtwitter-title">Growtwitter</h1>
        <p className="growtwitter-description">
          O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.
        </p>
      </LoginLeftSide>
      <LoginRightSide style={{ minHeight: '100vh'}}>
        <Title>Cadastro</Title>
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="avatar">Avatar (link da foto, opcional)</label>
            <input
              type="text"
              id="avatar"
              placeholder="Link da foto (opcional)"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LoginButton type="submit">Cadastrar</LoginButton>
        </LoginForm>
        <LinkToLogin to="/login">Já tem uma conta? Faça login</LinkToLogin>
      </LoginRightSide>
    </CadastroContainer>
  );
}