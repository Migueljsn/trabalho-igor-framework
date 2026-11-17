import { Link, useParams } from "react-router-dom";
import { buscarReceitaPorId } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import BotaoFavorito from "../components/BotaoFavorito";

export default function DetalheReceita() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: receita, loading, error } = useFetch(
    () => buscarReceitaPorId(id),
    [id]
  );

  if (loading) return <Loading />;
  if (error) return <MensagemErro mensagem={error} />;
  if (!receita) {
    return (
      <section>
        <p>Receita não encontrada.</p>
        <Link to="/receitas">Voltar para as receitas</Link>
      </section>
    );
  }

  return (
    <section className="detalhe">
      <Link to="/receitas">← Voltar</Link>
      <h1>{receita.nome}</h1>
      <p>
        {receita.categoria} · {receita.origem}
      </p>
      <BotaoFavorito receita={receita} />

      <div className="detalhe-corpo">
        <img src={receita.imagem} alt={receita.nome} />
        <div>
          <h2>Ingredientes</h2>
          <ul>
            {receita.ingredientes.map((ing) => (
              <li key={ing.nome}>
                {ing.medida} {ing.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Modo de preparo</h2>
      <p className="instrucoes">{receita.instrucoes}</p>

      {receita.video && (
        <p>
          <a href={receita.video} target="_blank" rel="noreferrer">
            Assistir no YouTube
          </a>
        </p>
      )}
    </section>
  );
}
