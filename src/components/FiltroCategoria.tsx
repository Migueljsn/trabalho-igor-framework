import type { Categoria } from "../types";

interface FiltroCategoriaProps {
  categorias: Categoria[];
  selecionada: string;
  aoSelecionar: (categoria: string) => void;
}

export default function FiltroCategoria({
  categorias,
  selecionada,
  aoSelecionar,
}: FiltroCategoriaProps) {
  return (
    <select
      className="filtro"
      value={selecionada}
      onChange={(e) => aoSelecionar(e.target.value)}
      aria-label="Filtrar por categoria"
    >
      <option value="">Todas as categorias</option>
      {categorias.map((c) => (
        <option key={c.nome} value={c.nome}>
          {c.nome}
        </option>
      ))}
    </select>
  );
}
