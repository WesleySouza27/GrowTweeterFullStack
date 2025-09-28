import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/growTweeter-api/auth';
import {
  LoginPageContainer,
  LoginLeftSide,
  LoginRightSide,
  LoginTitle,
  LoginForm,
  FormGroup,
  LoginButton,
  ErrorMessage,
  SignupLink,
} from './Login.styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    try {
      const response = await loginUser({ email, password });
      console.log('Resposta do serviço loginUser:', response);
      if (response?.token && response?.usuario) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.usuario));
        console.log('Token armazenado:', localStorage.getItem('authToken'));
        window.location.href = '/';
        navigate('/');
        return;
      } else {
        setError('Falha ao fazer login. Tente novamente.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido ao fazer login.');
      }
    }
  };

  return (
    <LoginPageContainer>
      <LoginLeftSide>
        <h1 className="growtwitter-title">Growtwitter</h1>
        <p className="growtwitter-description">
          O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.
        </p>
      </LoginLeftSide>
      <LoginRightSide>
        <LoginTitle>Entrar no Growtwitter</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LoginButton type="submit">Entrar</LoginButton>
        </LoginForm>
        <SignupLink>
          Não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link>
        </SignupLink>
      </LoginRightSide>
    </LoginPageContainer>
  );
}