import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor, preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);

    try {
      // POST /auth/login
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password: password,
        senha: password, // compatibilidade
      });

      const data = response.data;

      // Salvar credenciais no localStorage
      if (data.token) {
        localStorage.setItem("pawconnect_token", data.token);
      } else {
        localStorage.setItem("pawconnect_token", "authenticated-session");
      }

      const userData = data.usuario || data.user || { email };
      localStorage.setItem("pawconnect_user", JSON.stringify(userData));

      setSuccessMessage("Login efetuado com sucesso! Redirecionando...");

      // Redirecionamento automático para a página inicial (Home / Dashboard)
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Erro no login:", error);
      const msg =
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "Falha ao realizar login. Verifique suas credenciais.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md dark-luxury-card rounded-3xl p-8 border border-amber-500/25 relative overflow-hidden">
        {/* Glow de fundo sutil */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4 shadow-lg shadow-amber-500/5">
            <span className="text-3xl">🐾</span>
          </div>
          <h1 className="text-3xl font-extrabold gold-gradient-text tracking-wide">
            PawConnect
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Entre na sua conta para transformar vidas de animais
          </p>
        </div>

        {/* Mensagens de Feedback */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3 animate-fade-in">
            <span className="text-lg">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 animate-fade-in">
            <span className="text-lg">✨</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
              E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text.zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Autenticando...</span>
              </>
            ) : (
              <span>Entrar no Sistema</span>
            )}
          </button>
        </form>

        {/* Rodapé do Card */}
        <div className="mt-8 text-center pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors underline decoration-amber-500/40">
            Cadastre-se gratuitamente
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;