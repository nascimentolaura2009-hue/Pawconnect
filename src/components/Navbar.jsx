import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>PawConnect 🐾</h2>

      <div className="links">
        <Link to="/">Início</Link>
        <Link to="/pets">Pets</Link>
        <Link to="/perdidos">Perdidos</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </div>
    </nav>
  );
}

export default Navbar;