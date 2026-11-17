interface LoadingProps {
  texto?: string;
}

export default function Loading({ texto = "Carregando..." }: LoadingProps) {
  return (
    <div className="loading" role="status">
      <div className="spinner" />
      <p>{texto}</p>
    </div>
  );
}
