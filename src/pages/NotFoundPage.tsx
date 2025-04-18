import { Link } from 'react-router-dom';
import './styles.module.css';

export function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você tentou acessar não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}