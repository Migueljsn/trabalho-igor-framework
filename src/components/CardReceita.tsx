import { Link } from "react-router-dom";
import type { ReceitaResumo } from "../types";
import BotaoFavorito from "./BotaoFavorito";

interface CardReceitaProps {
  receita: ReceitaResumo;
}

export default function CardReceita({ receita }: CardReceitaProps) {
  return (
    <article className="card">
      <Link to={`/receitas/${receita.id}`}>
        <img src={receita.imagem} alt={receita.nome} loading="lazy" />
        <h3>{receita.nome}</h3>
      </Link>
      <BotaoFavorito receita={receita} />
    </article>
  );
}
