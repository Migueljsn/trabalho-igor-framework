import { useEffect, useState } from "react";

interface EstadoFetch<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook genérico: executa uma função assíncrona sempre que `deps` mudar
 * e devolve { data, loading, error }.
 */
export function useFetch<T>(
  buscar: () => Promise<T>,
  deps: unknown[]
): EstadoFetch<T> {
  const [estado, setEstado] = useState<EstadoFetch<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelado = false;
    setEstado((anterior) => ({ ...anterior, loading: true, error: null }));

    buscar()
      .then((data) => {
        if (!cancelado) setEstado({ data, loading: false, error: null });
      })
      .catch((erro: unknown) => {
        if (!cancelado) {
          const mensagem =
            erro instanceof Error ? erro.message : "Erro desconhecido";
          setEstado({ data: null, loading: false, error: mensagem });
        }
      });

    // Evita atualizar o estado se o componente desmontar ou a busca mudar
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return estado;
}
