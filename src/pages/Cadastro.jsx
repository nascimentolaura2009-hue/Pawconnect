import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!nome || !email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem. Verifique e tente novamente.");
      return;
    }

    if (senha.length < 6) {
      setErrorMessage("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Chamada à API real no Back-End para persistência no MongoDB
      const response = await api.post("/auth/register", {
        name: nome.trim(),
        nome: nome.trim(),
        email: email.trim(),
        password: senha,
        senha: senha,
      });

      const data = response.data;

      // Salvar token e dados do usuário se retornados
      if (data.token) {
        localStorage.setItem("pawconnect_token", data.token);
      }
      const userData = data.usuario || data.user || { nome, email };
      localStorage.setItem("pawconnect_user", JSON.stringify(userData));

      setSuccessMessage("✨ Conta criada com sucesso! Dados salvos no MongoDB. Redirecionando...");

      // Redirecionar automaticamente para a página Inicial (Home / Dashboard)
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);
    } catch (error) {
      console.error("Erro no cadastro de usuário:", error);
      const msg =
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "Erro ao conectar com o servidor. Verifique se o Back-End está ativo.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md dark-luxury-card rounded-3xl p-8 border border-amber-500/25 relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4 shadow-lg shadow-amber-500/5">
            <span className="text-3xl">🐾</span>
          </div>
          <h1 className="text-3xl font-extrabold gold-gradient-text tracking-wide">
            Criar Sua Conta
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Junte-se ao PawConnect e ajude a transformar a vida de pets
          </p>
        </div>

        {/* Mensagens de Feedback */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <span className="text-lg">✨</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              placeholder="Ex: Maria Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
              Endereço de E-mail *
            </label>
            <input
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
              Senha (mínimo 6 caracteres) *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
              Confirmar Senha *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Salvando no Banco...</span>
              </>
            ) : (
              <span>Cadastrar Conta</span>
            )}
          </button>
        </form>

        {/* Rodapé do Card */}
        <div className="mt-8 text-center pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors underline decoration-amber-500/40">
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;