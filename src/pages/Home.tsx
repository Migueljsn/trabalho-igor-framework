import { Link } from "react-router-dom";
import { receitaAleatoria } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import BotaoFavorito from "../components/BotaoFavorito";

export default function Home() {
  const { data: receita, loading, error } = useFetch(receitaAleatoria, []);

  return (
    <section>
      <div className="hero">
        <h1>O que vamos cozinhar hoje?</h1>
        <p>
          Procure receitas de todo o mundo, veja os ingredientes e salve as
          suas preferidas.
        </p>
        <Link to="/receitas" className="btn">
          Ver receitas
        </Link>
      </div>

      <h2>Sugestão do dia</h2>
      {loading && <Loading />}
      {error && <MensagemErro mensagem={error} />}
      {receita && (
        <div className="destaque">
          <img src={receita.imagem} alt={receita.nome} />
          <div>
            <h3>{receita.nome}</h3>
            <p>
              {receita.categoria} · {receita.origem}
            </p>
            <Link to={`/receitas/${receita.id}`} className="btn">
              Ver receita completa
            </Link>{" "}
            <BotaoFavorito receita={receita} />
          </div>
        </div>
      )}
    </section>
  );
}
