import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <section className="texto">
      <h1>Página não encontrada</h1>
      <p>O endereço que você abriu não existe.</p>
      <Link to="/">Voltar ao início</Link>
    </section>
  );
}
