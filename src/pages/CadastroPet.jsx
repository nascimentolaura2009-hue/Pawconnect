import { useState } from "react";
import API_URL from "../services/api";

function CadastroPet() {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [descricao, setDescricao] = useState("");

  async function cadastrar(e) {
    e.preventDefault();

    const resposta = await fetch(`${API_URL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        especie,
        idade: Number(idade),
        descricao,
      }),
    });

    if (resposta.ok) {
      alert("Pet cadastrado com sucesso!");
      setNome("");
      setEspecie("");
      setIdade("");
      setDescricao("");
    } else {
      alert("Erro ao cadastrar pet.");
    }
  }

  return (
    <div>
      <h2>Cadastrar Pet</h2>

      <form onSubmit={cadastrar}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Espécie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPet;