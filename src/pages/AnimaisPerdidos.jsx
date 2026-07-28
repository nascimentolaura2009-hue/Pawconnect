import { useEffect, useState } from "react";
import api from "../services/api";
import "./AnimaisPerdidos.css";

function AnimaisPerdidos() {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    api.get("/pets")
      .then((res) => {
        setAnimais(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Animais Perdidos</h1>
      <p>Ajude a encontrar os donos desses pets.</p>

      {animais.map((animal) => (
        <div key={animal._id}>
          <h2>{animal.nome}</h2>
          <p>{animal.especie}</p>
          <p>{animal.descricao}</p>
        </div>
      ))}
    </div>
  );
}

export default AnimaisPerdidos;