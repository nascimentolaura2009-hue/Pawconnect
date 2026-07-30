import { Link } from "react-router-dom";

function PetCard({ pet, id, nome, name, idade, age, tipo, especie, species, imagem, image, status, raca, breed }) {
  // Extração inteligente de propriedades (compatível com modelos em Inglês e Português)
  const petId = pet?._id || pet?.id || id;
  const petName = pet?.name || pet?.nome || name || nome || "Pet sem nome";
  const petSpecies = pet?.species || pet?.especie || pet?.tipo || species || especie || tipo || "Animal";
  const petBreed = pet?.breed || pet?.raca || breed || raca || "";
  const petAge = pet?.age !== undefined ? pet.age : (pet?.idade !== undefined ? pet.idade : (age !== undefined ? age : idade));
  const petImage = pet?.image || pet?.imagem || image || imagem || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";
  const petStatus = pet?.status || status || "available";

  const statusLabel =
    petStatus === "available" || petStatus === "disponivel"
      ? "Disponível"
      : petStatus === "adopted" || petStatus === "adotado"
      ? "Adotado"
      : "Perdido";

  return (
    <div className="dark-luxury-card rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between h-full">
      <div className="relative">
        <div className="h-52 bg-zinc-950 overflow-hidden relative flex items-center justify-center">
          <img
            src={petImage}
            alt={petName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>

        <div className="absolute top-3 right-3 bg-zinc-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
          {statusLabel}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors truncate">
              {petName}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              {petSpecies}
            </span>
          </div>

          {petBreed && (
            <p className="text-xs text-amber-400/90 font-medium">
              Raça: {petBreed}
            </p>
          )}

          <p className="text-xs text-zinc-400 mt-1">
            Idade: <strong className="text-zinc-200">{petAge !== undefined && petAge !== null ? `${petAge} ano(s)` : "Filhote"}</strong>
          </p>
        </div>

        <Link
          to={`/pets/${petId}`}
          className="gold-button block text-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
        >
          Ver Detalhes ❤️
        </Link>
      </div>
    </div>
  );
}

export default PetCard;