import { Link } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import ListaReceitas from "../components/ListaReceitas";

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <section>
      <h1>Favoritos</h1>
      {favoritos.length === 0 && (
        <p className="vazio">
          Você ainda não favoritou nenhuma receita.{" "}
          <Link to="/receitas">Explorar receitas</Link>
        </p>
      )}
      <ListaReceitas receitas={favoritos} vazio="" />
    </section>
  );
}
