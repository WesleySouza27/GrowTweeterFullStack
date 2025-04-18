import './styles.module.css';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer-container">
      <p>&copy; 2025 Growtweet - Todos os direitos reservados.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </footer>
  );
}