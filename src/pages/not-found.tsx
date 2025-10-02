import { Link } from "@tanstack/react-router";

// TODO: Improve later
export const NotFound = () => (
  <main>
    <h1>Página não encontrada</h1>
    <p>Desculpe, a página que você está procurando não existe.</p>
    <Link to="/">Voltar para a página inicial</Link>
  </main>
);
