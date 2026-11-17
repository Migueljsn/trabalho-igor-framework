import { NavLink } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";

export default function Navbar() {
  const { favoritos } = useFavoritos();

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        Livro de Receitas
      </NavLink>
      <nav>
        <NavLink to="/" end>
          Início
        </NavLink>
        <NavLink to="/receitas">Receitas</NavLink>
        <NavLink to="/favoritos">Favoritos ({favoritos.length})</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>
    </header>
  );
}
