import type { ReceitaResumo } from "../types";
import CardReceita from "./CardReceita";

interface ListaReceitasProps {
  receitas: ReceitaResumo[];
  vazio?: string;
}

export default function ListaReceitas({
  receitas,
  vazio = "Nenhuma receita encontrada.",
}: ListaReceitasProps) {
  if (receitas.length === 0) {
    return vazio ? <p className="vazio">{vazio}</p> : null;
  }

  return (
    <div className="grade">
      {receitas.map((r) => (
        <CardReceita key={r.id} receita={r} />
      ))}
    </div>
  );
}
