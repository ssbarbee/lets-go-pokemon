import { useQuery } from '@tanstack/react-query';
import { Pokemon } from '@/types/pokemon';

const fetchPokemons = async (): Promise<Pokemon[]> => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
    const data = await res.json();

    const detailedData = await Promise.all(
        data.results.map(async (p: { url: string }) => {
            const resp = await fetch(p.url);
            return resp.json();
        })
    );

    return detailedData;
};

export const usePokemons = () => {
    return useQuery<Pokemon[]>({
        queryKey: ['pokemons'],
        queryFn: fetchPokemons,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};