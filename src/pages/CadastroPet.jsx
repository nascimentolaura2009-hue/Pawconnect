import { useState } from "react";
import "./CadastroPet.css";

function CadastroPet(){

const[nome,setNome]=useState("");
const[tipo,setTipo]=useState("");
const[raca,setRaca]=useState("");
const[idade,setIdade]=useState("");
const[cidade,setCidade]=useState("");
const[descricao,setDescricao]=useState("");
const[foto,setFoto]=useState("");

function cadastrar(e){

e.preventDefault();

alert("Animal cadastrado!");

setNome("");
setTipo("");
setRaca("");
setIdade("");
setCidade("");
setDescricao("");
setFoto("");

}

return(

<div className="cadastroPet">

<h1>Cadastrar Animal 🐾</h1>

<form onSubmit={cadastrar}>

<input
type="text"
placeholder="Nome"
value={nome}
onChange={(e)=>setNome(e.target.value)}
required
/>

<input
type="text"
placeholder="Tipo"
value={tipo}
onChange={(e)=>setTipo(e.target.value)}
required
/>

<input
type="text"
placeholder="Raça"
value={raca}
onChange={(e)=>setRaca(e.target.value)}
required
/>

<input
type="number"
placeholder="Idade"
value={idade}
onChange={(e)=>setIdade(e.target.value)}
required
/>

<input
type="text"
placeholder="Cidade"
value={cidade}
onChange={(e)=>setCidade(e.target.value)}
required
/>

<textarea
placeholder="Descrição"
value={descricao}
onChange={(e)=>setDescricao(e.target.value)}
></textarea>

<input
type="text"
placeholder="URL da Foto"
value={foto}
onChange={(e)=>setFoto(e.target.value)}
/>

<button type="submit">
Cadastrar Animal
</button>

</form>

</div>

);

}

export default CadastroPet;