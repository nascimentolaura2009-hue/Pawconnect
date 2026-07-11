import { useParams } from "react-router-dom";

function PetDetalhes(){

const {id}=useParams();

return(

<div style={{padding:"40px"}}>

<h1>Detalhes do Pet</h1>

<h2>Pet #{id}</h2>

<p>Informações do animal aparecerão aqui.</p>

<button>Quero adotar ❤️</button>

</div>

);

}

export default PetDetalhes;