import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("pawconnect_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pawconnect_token");
    localStorage.removeItem("pawconnect_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/85 backdrop-blur-xl border-b border-amber-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🐾
          </div>
          <span className="text-xl sm:text-2xl font-black gold-gradient-text tracking-wide">
            PawConnect
          </span>
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-amber-400 transition-colors">Início</Link>
          <Link to="/pets" className="hover:text-amber-400 transition-colors">Pets</Link>
          <Link to="/cadastropet" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 rounded-full shadow-sm">
            <span>➕</span> Cadastrar Pet
          </Link>
          <Link to="/perdidos" className="hover:text-amber-400 transition-colors">Perdidos</Link>
        </nav>

        {/* Auth status / Ações */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 hidden sm:inline-block">
                Olá, <strong className="text-amber-300">{user.name || user.nome || "Usuário"}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-500/40 text-xs font-semibold transition-all cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl text-zinc-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/cadastro"
                className="gold-button text-xs sm:text-sm font-bold px-4 py-2 rounded-xl"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;