import "./Login.css";

function Login(){

return(
  <div className="login-container">

    <div className="login-card">

      <h1>PawConnect 🐾</h1>

      <p>Entre para ajudar um animal</p>

      <form>

        <label>Email</label>
        <input 
          type="email"
          placeholder="Digite seu email"
        />


        <label>Senha</label>
        <input 
          type="password"
          placeholder="Digite sua senha"
        />


        <button>
          Entrar
        </button>

      </form>

    </div>

  </div>
);

}

export default Login;