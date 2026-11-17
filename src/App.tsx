import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Receitas from "./pages/Receitas";
import DetalheReceita from "./pages/DetalheReceita";
import Favoritos from "./pages/Favoritos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NaoEncontrada from "./pages/NaoEncontrada";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/receitas/:id" element={<DetalheReceita />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
