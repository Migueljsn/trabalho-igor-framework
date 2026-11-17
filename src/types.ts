export interface ReceitaResumo {
  id: string;
  nome: string;
  imagem: string;
}

export interface Ingrediente {
  nome: string;
  medida: string;
}

export interface Receita extends ReceitaResumo {
  categoria: string;
  origem: string;
  instrucoes: string;
  ingredientes: Ingrediente[];
  video: string | null;
}

export interface Categoria {
  nome: string;
}
