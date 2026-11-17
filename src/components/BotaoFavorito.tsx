import { useFavoritos } from "../context/FavoritosContext";
import type { ReceitaResumo } from "../types";

interface BotaoFavoritoProps {
  receita: ReceitaResumo;
}

export default function BotaoFavorito({ receita }: BotaoFavoritoProps) {
  const { ehFavorito, alternarFavorito } = useFavoritos();
  const ativo = ehFavorito(receita.id);

  return (
    <button
      type="button"
      className={ativo ? "btn-favorito ativo" : "btn-favorito"}
      onClick={() => alternarFavorito(receita)}
      aria-pressed={ativo}
    >
      {ativo ? "★ Favoritada" : "☆ Favoritar"}
    </button>
  );
}
