import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PetCard from "../components/PetCard";

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPets = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      let response;
      try {
        response = await api.get("/pets");
      } catch (err) {
        if (err.response?.status === 404) {
          response = await api.get("/api/pets");
        } else {
          throw err;
        }
      }

      // Processar resposta (seja array direto ou objeto { pets: [...] })
      const rawData = response.data;
      let petsArray = [];

      if (Array.isArray(rawData)) {
        petsArray = rawData;
      } else if (rawData && Array.isArray(rawData.pets)) {
        petsArray = rawData.pets;
      } else if (rawData && Array.isArray(rawData.data)) {
        petsArray = rawData.data;
      }

      setPets(petsArray);
    } catch (error) {
      console.error("Erro ao buscar lista de pets no servidor:", error);
      setErrorMessage("Não foi possível carregar a lista de pets no momento. Verifique se o servidor está ativo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold gold-gradient-text">
            Pets Disponíveis 🐾
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Conheça todos os animais cadastrados na plataforma PawConnect em tempo real
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPets}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/20 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-500/40 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>🔄</span> Atualizar Lista
          </button>

          <Link
            to="/cadastropet"
            className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            ➕ Cadastrar Pet
          </Link>
        </div>
      </div>

      {/* Alerta de erro */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
          <button onClick={fetchPets} className="underline text-xs font-bold hover:text-white cursor-pointer">
            Tentar novamente
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="inline-block animate-spin text-4xl">🐾</div>
          <p className="text-zinc-400 text-sm font-medium">Carregando pets do banco de dados MongoDB...</p>
        </div>
      ) : pets.length === 0 ? (
        /* Lista Vazia */
        <div className="dark-luxury-card rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 border border-amber-500/20">
          <div className="text-5xl">🐶🐱</div>
          <h3 className="text-xl font-bold text-white">Nenhum pet cadastrado ainda</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Seja o primeiro a cadastrar um animal no PawConnect para que ele apareça aqui!
          </p>
          <Link
            to="/cadastropet"
            className="gold-button inline-block px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-2"
          >
            Cadastrar Primeiro Pet
          </Link>
        </div>
      ) : (
        /* Grid de Cards de Pets */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet._id || pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Pets;