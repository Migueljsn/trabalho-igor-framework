export default function Sobre() {
  return (
    <section className="texto">
      <h1>Sobre o projeto</h1>
      <p>
        O Livro de Receitas é um trabalho da disciplina de Front-end Frameworks
        (Ciência da Computação), feito com React, TypeScript e React Router.
      </p>
      <p>
        As receitas vêm da API gratuita TheMealDB. Os favoritos ficam salvos no
        seu navegador, então continuam aqui quando você voltar.
      </p>
      <h2>Tecnologias</h2>
      <ul>
        <li>React 18 + TypeScript</li>
        <li>React Router para as páginas</li>
        <li>Context API para os favoritos</li>
        <li>
          Hooks: useState, useEffect, useContext, useRef, useMemo e hooks
          próprios
        </li>
      </ul>
    </section>
  );
}
