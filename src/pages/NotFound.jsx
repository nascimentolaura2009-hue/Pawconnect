import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound(){

return(

<div className="notfound">

<h1>404</h1>

<p>Página não encontrada.</p>

<Link to="/">
Voltar para o início
</Link>

</div>

);

}

export default NotFound;