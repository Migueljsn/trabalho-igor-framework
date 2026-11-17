import { useMemo, useState } from "react";
import {
  buscarReceitas,
  listarCategorias,
  receitasPorCategoria,
} from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import BarraBusca from "../components/BarraBusca";
import FiltroCategoria from "../components/FiltroCategoria";
import ListaReceitas from "../components/ListaReceitas";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";

export default function Receitas() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const buscaAtrasada = useDebounce(busca, 400);

  const { data: categorias } = useFetch(listarCategorias, []);

  // Com categoria: usa o endpoint de filtro. Sem categoria: busca por nome.
  const {
    data: receitas,
    loading,
    error,
  } = useFetch(
    () =>
      categoria
        ? receitasPorCategoria(categoria)
        : buscarReceitas(buscaAtrasada.trim() || "a"),
    [categoria, categoria ? "" : buscaAtrasada]
  );

  // Quando há categoria, a busca por texto é aplicada na lista já carregada
  const visiveis = useMemo(() => {
    if (!receitas) return [];
    const termo = buscaAtrasada.trim().toLowerCase();
    if (!categoria || !termo) return receitas;
    return receitas.filter((r) => r.nome.toLowerCase().includes(termo));
  }, [receitas, categoria, buscaAtrasada]);

  return (
    <section>
      <h1>Receitas</h1>
      <div className="controles">
        <BarraBusca valor={busca} aoMudar={setBusca} />
        <FiltroCategoria
          categorias={categorias ?? []}
          selecionada={categoria}
          aoSelecionar={setCategoria}
        />
      </div>

      {loading && <Loading texto="Buscando receitas..." />}
      {error && <MensagemErro mensagem={error} />}
      {!loading && !error && <ListaReceitas receitas={visiveis} />}
    </section>
  );
}
