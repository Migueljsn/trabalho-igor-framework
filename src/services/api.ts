import type { Categoria, Ingrediente, Receita, ReceitaResumo } from "../types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Formato cru devolvido pela TheMealDB
type MealRaw = Record<string, string | null>;

async function get<T>(caminho: string): Promise<T> {
  const resposta = await fetch(`${BASE_URL}/${caminho}`);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao acessar a API`);
  }
  return (await resposta.json()) as T;
}

function paraResumo(m: MealRaw): ReceitaResumo {
  return {
    id: m.idMeal ?? "",
    nome: m.strMeal ?? "",
    imagem: m.strMealThumb ?? "",
  };
}

function paraReceita(m: MealRaw): Receita {
  const ingredientes: Ingrediente[] = [];
  for (let i = 1; i <= 20; i++) {
    const nome = m[`strIngredient${i}`]?.trim();
    const medida = m[`strMeasure${i}`]?.trim() ?? "";
    if (nome) ingredientes.push({ nome, medida });
  }
  return {
    ...paraResumo(m),
    categoria: m.strCategory ?? "",
    origem: m.strArea ?? "",
    instrucoes: m.strInstructions ?? "",
    ingredientes,
    video: m.strYoutube || null,
  };
}

export async function buscarReceitas(termo: string): Promise<ReceitaResumo[]> {
  const dados = await get<{ meals: MealRaw[] | null }>(
    `search.php?s=${encodeURIComponent(termo)}`
  );
  return (dados.meals ?? []).map(paraResumo);
}

export async function receitasPorCategoria(
  categoria: string
): Promise<ReceitaResumo[]> {
  const dados = await get<{ meals: MealRaw[] | null }>(
    `filter.php?c=${encodeURIComponent(categoria)}`
  );
  return (dados.meals ?? []).map(paraResumo);
}

export async function listarCategorias(): Promise<Categoria[]> {
  const dados = await get<{ meals: { strCategory: string }[] }>(
    "list.php?c=list"
  );
  return dados.meals.map((c) => ({ nome: c.strCategory }));
}

export async function buscarReceitaPorId(id: string): Promise<Receita | null> {
  const dados = await get<{ meals: MealRaw[] | null }>(`lookup.php?i=${id}`);
  return dados.meals && dados.meals[0] ? paraReceita(dados.meals[0]) : null;
}

export async function receitaAleatoria(): Promise<Receita | null> {
  const dados = await get<{ meals: MealRaw[] | null }>("random.php");
  return dados.meals && dados.meals[0] ? paraReceita(dados.meals[0]) : null;
}
