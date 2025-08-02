import { useQuery } from '@tanstack/react-query';
import { Pokemon } from '@/types/pokemon';

const fetchPokemon = async (id: string | number): Promise<Pokemon> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Failed to fetch Pokémon details');
    return res.json();
};

export const usePokemon = (id: string | number | undefined) => {
    return useQuery<Pokemon>({
        queryKey: ['pokemon', id],
        queryFn: () => fetchPokemon(id!),
        enabled: !!id, // Prevent query from running if id is undefined
    });
};