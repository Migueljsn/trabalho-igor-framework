interface MensagemErroProps {
  mensagem: string;
}

export default function MensagemErro({ mensagem }: MensagemErroProps) {
  return (
    <div className="erro" role="alert">
      <strong>Algo deu errado.</strong>
      <p>{mensagem}</p>
      <p>Verifique sua conexão e recarregue a página.</p>
    </div>
  );
}
