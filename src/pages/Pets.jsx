import "./Pets.css";
import PetCard from "../components/PetCard";

function Pets() {

const pets=[
{
id:1,
nome:"Nina",
idade:2,
tipo:"Cachorro",
imagem:"https://placedog.net/400/300"
},
{
id:2,
nome:"Mingau",
idade:1,
tipo:"Gato",
imagem:"https://placecats.com/400/300"
},
{
id:3,
nome:"Thor",
idade:4,
tipo:"Cachorro",
imagem:"https://placedog.net/401/300"
}
];

return(

<div>

<h1>Pets disponíveis 🐾</h1>

<div className="pets-list">

{pets.map((pet)=>(
<PetCard
key={pet.id}
id={pet.id}
nome={pet.nome}
idade={pet.idade}
tipo={pet.tipo}
imagem={pet.imagem}
/>
))}

</div>

</div>

);

}

export default Pets;