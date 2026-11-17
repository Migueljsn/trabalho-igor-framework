import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ReceitaResumo } from "../types";

interface FavoritosContextoTipo {
  favoritos: ReceitaResumo[];
  ehFavorito: (id: string) => boolean;
  alternarFavorito: (receita: ReceitaResumo) => void;
}

const FavoritosContext = createContext<FavoritosContextoTipo | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useLocalStorage<ReceitaResumo[]>(
    "favoritos",
    []
  );

  const valor = useMemo<FavoritosContextoTipo>(
    () => ({
      favoritos,
      ehFavorito: (id) => favoritos.some((f) => f.id === id),
      alternarFavorito: (receita) =>
        setFavoritos((atuais) =>
          atuais.some((f) => f.id === receita.id)
            ? atuais.filter((f) => f.id !== receita.id)
            : [
                ...atuais,
                { id: receita.id, nome: receita.nome, imagem: receita.imagem },
              ]
        ),
    }),
    [favoritos, setFavoritos]
  );

  return (
    <FavoritosContext.Provider value={valor}>
      {children}
    </FavoritosContext.Provider>
  );
}

/** Hook para consumir o contexto de favoritos em qualquer componente. */
export function useFavoritos(): FavoritosContextoTipo {
  const ctx = useContext(FavoritosContext);
  if (!ctx) {
    throw new Error("useFavoritos deve ser usado dentro de FavoritosProvider");
  }
  return ctx;
}
