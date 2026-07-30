import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Lado Esquerdo - Mensagem Hero */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <span>🐾</span> Plataforma Inteligente PawConnect
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight gold-gradient-text">
            Conecte Vidas com Amor e Cuidado.
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Encontre o companheiro perfeito para adoção ou cadastre pets que precisam de um novo lar. Juntos fazemos a diferença.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <Link to="/cadastropet" className="gold-button px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg">
              ➕ Cadastrar Pet
            </Link>

            <Link
              to="/pets"
              className="px-7 py-3.5 rounded-xl bg-zinc-900 border border-amber-500/20 text-zinc-200 font-bold text-sm uppercase tracking-wider hover:bg-zinc-800 hover:border-amber-500/40 transition-all"
            >
              Ver Pets Disponíveis
            </Link>
          </div>
        </div>

        {/* Lado Direito - Card Visual Exclusivo */}
        <div className="md:col-span-5 relative">
          <div className="dark-luxury-card rounded-3xl p-8 border border-amber-500/30 text-center relative overflow-hidden space-y-6">
            <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/10 border border-amber-500/40 flex items-center justify-center text-6xl shadow-2xl">
              🐶🐱
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-zinc-100">Módulo Completo de Pets</h3>
              <p className="text-xs text-zinc-400">
                Gerencie cadastros, status de adoção e perfis de animais com alta precisão e estética luxuosa.
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-around text-center text-xs">
              <div>
                <div className="text-amber-400 font-bold text-lg">100%</div>
                <div className="text-zinc-500">Integrado</div>
              </div>
              <div>
                <div className="text-amber-400 font-bold text-lg">REST</div>
                <div className="text-zinc-500">API</div>
              </div>
              <div>
                <div className="text-amber-400 font-bold text-lg">Tailwind</div>
                <div className="text-zinc-500">Dark Luxury</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;