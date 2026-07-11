import { Link } from "react-router-dom";
import "./PetCard.css";

function PetCard({ id, nome, idade, tipo, imagem }) {
  return (
    <div className="pet-card">

      <img src={imagem} alt={nome} />

      <h3>{nome}</h3>

      <p>{tipo}</p>

      <p>{idade} anos</p>

      <Link to={`/pets/${id}`}>
        Ver detalhes
      </Link>

    </div>
  );
}

export default PetCard;