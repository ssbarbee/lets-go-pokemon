import { useRouter } from 'next/router';
import { PokemonDetails } from '@/components/PokemonDetails';
import { usePokemon } from '@/hooks/usePokemon';

const PokemonPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: pokemon, isLoading, isError } = usePokemon(id as string);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to fetch Pokémon details.</div>;
    if (!pokemon) return null;

    return (
        <div className="container mx-auto p-4">
            <PokemonDetails pokemon={pokemon} />
        </div>
    );
};

export default PokemonPage;