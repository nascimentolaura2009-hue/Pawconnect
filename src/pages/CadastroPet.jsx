import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CadastroPet() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Cão");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Macho");
  const [size, setSize] = useState("Médio");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("available");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [petsList, setPetsList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const navigate = useNavigate();

  // Carregar lista de pets cadastrados
  const fetchPets = async () => {
    setLoadingList(true);
    try {
      const response = await api.get("/pets");
      setPetsList(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar lista de pets:", err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !species) {
      setErrorMessage("Por favor, preencha o nome e a espécie do pet.");
      return;
    }

    setLoading(true);

    try {
      // O backend aceita payload em Inglês e mapeia automaticamente para os modelos
      const payload = {
        name,
        nome: name,
        species,
        especie: species,
        breed: breed || "Misto / Vira-lata",
        raca: breed || "Misto / Vira-lata",
        age: age !== "" ? Number(age) : 0,
        idade: age !== "" ? Number(age) : 0,
        gender,
        genero: gender,
        size,
        porte: size,
        description,
        descricao: description,
        image,
        imagem: image,
        status,
      };

      const response = await api.post("/pets", payload);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage(`✨ Pet "${name}" cadastrado com sucesso no PawConnect!`);
        
        // Limpar formulário
        setName("");
        setBreed("");
        setAge("");
        setDescription("");
        setImage("");
        setStatus("available");

        // Atualizar lista
        fetchPets();
      }
    } catch (error) {
      console.error("Erro no cadastro do pet:", error);
      const msg =
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "Falha ao cadastrar o pet. Verifique os dados fornecidos.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-6xl mx-auto space-y-12">
      {/* Título Principal */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          ✨ Módulo de Cadastro Exclusivo
        </div>
        <h1 className="text-4xl md:text-5xl font-black gold-gradient-text">
          Cadastrar Novo Pet
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          Adicione um novo animal ao sistema PawConnect com informações completas e visualização em tempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Cadastro (Dark Luxury) */}
        <div className="lg:col-span-8 dark-luxury-card rounded-3xl p-6 sm:p-8 border border-amber-500/25 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
            <span className="text-amber-400">🐾</span> Dados do Animal
          </h2>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
              <span className="text-lg">🎉</span>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleCadastro} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Nome do Pet *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Thor, Mia, Rex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                />
              </div>

              {/* Espécie */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Espécie *
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                >
                  <option value="Cão" className="bg-zinc-900">🐶 Cão / Cachorro</option>
                  <option value="Gato" className="bg-zinc-900">🐱 Gato</option>
                  <option value="Ave" className="bg-zinc-900">🦜 Ave / Pássaro</option>
                  <option value="Outro" className="bg-zinc-900">🐾 Outro</option>
                </select>
              </div>

              {/* Raça */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Raça
                </label>
                <input
                  type="text"
                  placeholder="Ex: Golden Retriever, SRD, Persa"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                />
              </div>

              {/* Idade */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Idade (em anos)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  placeholder="Ex: 2"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                />
              </div>

              {/* Gênero */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Gênero
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                >
                  <option value="Macho" className="bg-zinc-900">♂️ Macho</option>
                  <option value="Fêmea" className="bg-zinc-900">♀️ Fêmea</option>
                </select>
              </div>

              {/* Porte */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                  Porte
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                >
                  <option value="Pequeno" className="bg-zinc-900">Pequeno</option>
                  <option value="Médio" className="bg-zinc-900">Médio</option>
                  <option value="Grande" className="bg-zinc-900">Grande</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                Status no Sistema
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
              >
                <option value="available" className="bg-zinc-900">Disponível para Adoção</option>
                <option value="adopted" className="bg-zinc-900">Já Adotado</option>
                <option value="lost" className="bg-zinc-900">Procurando / Perdido</option>
              </select>
            </div>

            {/* Imagem URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                URL da Foto/Imagem
              </label>
              <input
                type="url"
                placeholder="https://exemplo.com/foto-do-pet.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                Descrição & Cuidados Especiais
              </label>
              <textarea
                rows="4"
                placeholder="Conte um pouco sobre o temperamento, vacinas, personalidade..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm resize-none"
              />
            </div>

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gold-button py-4 px-6 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Cadastrando Pet...</span>
                </>
              ) : (
                <span>Confirmar Cadastro do Pet</span>
              )}
            </button>
          </form>
        </div>

        {/* Card Lateral: Preview do Card em Tempo Real */}
        <div className="lg:col-span-4 space-y-6">
          <div className="dark-luxury-card rounded-3xl p-6 border border-amber-500/25">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300/90 mb-4 flex items-center gap-2">
              <span>👁️</span> Pré-visualização do Card
            </h3>

            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
              {/* Foto do Pet */}
              <div className="h-52 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt={name || "Preview"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                ) : (
                  <div className="text-center p-6 text-zinc-600 space-y-2">
                    <span className="text-4xl block">📷</span>
                    <span className="text-xs">Insira a URL da foto</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/30">
                  {status === "available" ? "Disponível" : status === "adopted" ? "Adotado" : "Perdido"}
                </div>
              </div>

              {/* Detalhes no Card */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white truncate">
                    {name || "Nome do Pet"}
                  </h4>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {species}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 border-t border-b border-zinc-800/80 py-2.5">
                  <div>Raça: <strong className="text-zinc-200">{breed || "Misto"}</strong></div>
                  <div>Idade: <strong className="text-zinc-200">{age ? `${age} ano(s)` : "Filhote"}</strong></div>
                  <div>Gênero: <strong className="text-zinc-200">{gender}</strong></div>
                  <div>Porte: <strong className="text-zinc-200">{size}</strong></div>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 italic">
                  {description || "A descrição do pet aparecerá aqui..."}
                </p>
              </div>
            </div>
          </div>

          {/* Quick List de Pets Cadastrados Recentemente */}
          <div className="dark-luxury-card rounded-3xl p-6 border border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-300/90">
                Pets Cadastrados ({petsList.length})
              </h3>
              <button
                onClick={fetchPets}
                className="text-xs text-amber-400 hover:underline"
              >
                Atualizar
              </button>
            </div>

            {loadingList ? (
              <div className="text-center py-4 text-xs text-zinc-500">Carregando...</div>
            ) : petsList.length === 0 ? (
              <div className="text-center py-4 text-xs text-zinc-500 italic">
                Nenhum pet cadastrado no momento.
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {petsList.slice(0, 5).map((pet) => (
                  <div
                    key={pet._id || pet.id}
                    className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-300">
                        {(pet.name || pet.nome || "P")[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-200">{pet.name || pet.nome}</div>
                        <div className="text-zinc-500 text-[10px]">{pet.species || pet.especie}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {pet.status || "Ativo"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroPet;