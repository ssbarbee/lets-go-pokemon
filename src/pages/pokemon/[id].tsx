import { useRouter } from "next/router";
import { PokemonDetails } from "@/components/PokemonDetails";
import { PokemonType, usePokemonDetails } from "@/hooks/usePokemonDetails";

const typeBackgrounds: Record<PokemonType, string> = {
  fire: "bg-gradient-to-br from-orange-200 via-red-300 to-red-500",
  water: "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500",
  grass: "bg-gradient-to-br from-green-200 via-green-300 to-green-500",
  electric: "bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500",
  psychic: "bg-gradient-to-br from-pink-200 via-pink-300 to-pink-500",
  normal: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500",
  ice: "bg-gradient-to-br from-blue-100 via-cyan-200 to-blue-300",
  rock: "bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700",
  ground: "bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-600",
  bug: "bg-gradient-to-br from-lime-300 via-green-400 to-green-600",
  fighting: "bg-gradient-to-br from-red-300 via-red-500 to-red-700",
  flying: "bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500",
  ghost: "bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700",
  poison: "bg-gradient-to-br from-purple-300 via-fuchsia-500 to-purple-700",
  steel: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600",
  dragon: "bg-gradient-to-br from-indigo-400 via-indigo-600 to-purple-800",
  fairy: "bg-gradient-to-br from-pink-200 via-pink-400 to-pink-600",
  dark: "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900",
};

const PokemonPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: pokemon, isLoading, isError } = usePokemonDetails(id as string);

  if (isLoading) return <div className="flex justify-center items-center h-full text-gray-500 text-xl">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-full text-red-500 text-xl">Failed to fetch Pokémon details.</div>;
  if (!pokemon) return null;

  const primaryType = pokemon.types[0].type.name;
  const backgroundClass = typeBackgrounds[primaryType] || "bg-gradient-to-br from-gray-200 to-gray-400";

  return (
    <div className={`relative min-h-screen flex items-center justify-center ${backgroundClass} overflow-hidden`}>
      <div className="noise-overlay"></div>
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
};

export default PokemonPage;
