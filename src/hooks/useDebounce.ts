import { useEffect, useState } from "react";

/** Só atualiza o valor depois que o usuário para de digitar por `atraso` ms. */
export function useDebounce<T>(valor: T, atraso = 400): T {
  const [valorAtrasado, setValorAtrasado] = useState<T>(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorAtrasado(valor), atraso);
    return () => clearTimeout(timer);
  }, [valor, atraso]);

  return valorAtrasado;
}
