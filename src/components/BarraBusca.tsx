import { useEffect, useRef } from "react";

interface BarraBuscaProps {
  valor: string;
  aoMudar: (novoValor: string) => void;
}

export default function BarraBusca({ valor, aoMudar }: BarraBuscaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Ao abrir a página, o cursor já fica pronto para digitar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="busca">
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar receita (em inglês, ex.: chicken)"
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        aria-label="Buscar receita"
      />
      {valor && (
        <button
          type="button"
          onClick={() => {
            aoMudar("");
            inputRef.current?.focus();
          }}
        >
          Limpar
        </button>
      )}
    </div>
  );
}
