import { useRouter } from 'next/router';
import { PokemonDetails } from '@/components/PokemonDetails';
import { usePokemon } from '@/hooks/usePokemon';

const typeBackgrounds: Record<string, string> = {
    fire: 'bg-gradient-to-br from-orange-200 via-red-300 to-red-500',
    water: 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500',
    grass: 'bg-gradient-to-br from-green-200 via-green-300 to-green-500',
    electric: 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500',
    psychic: 'bg-gradient-to-br from-pink-200 via-pink-300 to-pink-500',
    normal: 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500',
    // Add more types as needed
};

const PokemonPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: pokemon, isLoading, isError } = usePokemon(id as string);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to fetch Pokémon details.</div>;
    if (!pokemon) return null;

    const primaryType = pokemon.types[0].type.name;
    const backgroundClass = typeBackgrounds[primaryType] || 'bg-gradient-to-br from-gray-200 to-gray-400';

    return (
        <div className={`relative min-h-screen flex items-center justify-center ${backgroundClass} overflow-hidden`}>
            <div className="noise-overlay"></div>
            <PokemonDetails pokemon={pokemon}/>
        </div>
    );
};

export default PokemonPage;