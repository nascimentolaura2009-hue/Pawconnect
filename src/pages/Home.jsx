import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="hero">

      <div>

        <h1>Conecte vidas com o PawConnect 🐾</h1>

        <p>
          Encontre animais para adoção e ajude pets perdidos.
        </p>

        <Link to="/animais-perdidos">
          <button>Encontrar pets</button>
        </Link>

      </div>

      <div className="hero-image">
        🐶🐱
      </div>

    </section>
  );
}

export default Home;