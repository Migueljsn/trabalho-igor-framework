import { useState, type ChangeEvent, type FormEvent } from "react";

interface DadosContato {
  nome: string;
  email: string;
  mensagem: string;
}

const VAZIO: DadosContato = { nome: "", email: "", mensagem: "" };

export default function FormularioContato() {
  const [dados, setDados] = useState<DadosContato>(VAZIO);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  function aoMudar(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setDados({ ...dados, [e.target.name]: e.target.value });
    setEnviado(false);
  }

  function aoEnviar(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!dados.nome.trim() || !dados.mensagem.trim()) {
      setErro("Preencha o nome e a mensagem.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
      setErro("Digite um e-mail válido.");
      return;
    }
    setErro("");
    setEnviado(true);
    setDados(VAZIO);
  }

  return (
    <form className="formulario" onSubmit={aoEnviar} noValidate>
      <label>
        Nome
        <input name="nome" value={dados.nome} onChange={aoMudar} />
      </label>
      <label>
        E-mail
        <input
          name="email"
          type="email"
          value={dados.email}
          onChange={aoMudar}
        />
      </label>
      <label>
        Mensagem
        <textarea
          name="mensagem"
          rows={5}
          value={dados.mensagem}
          onChange={aoMudar}
        />
      </label>
      {erro && <p className="erro-form">{erro}</p>}
      {enviado && <p className="sucesso">Mensagem enviada. Obrigado!</p>}
      <button type="submit">Enviar mensagem</button>
    </form>
  );
}
