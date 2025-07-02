import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f8fa;
`;

export const LoginLeftSide = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1da1f2;
  color: white;

  .growtwitter-title {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .growtwitter-description {
    font-size: 1.3rem;
    width: 70%;
    text-align: center;
    line-height: 1.5;
  }
`;

export const LoginRightSide = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const LoginTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1da1f2;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

export const LoginButton = styled.button`
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0c85d0;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const SignupLink = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;

  a {
    color: #1da1f2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;