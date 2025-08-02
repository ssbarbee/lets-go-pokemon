import { useQuery } from '@tanstack/react-query';

export type PokemonNameIdDto = {
    name: string;
    id: number;
};

export const usePokemons = () => {
    return useQuery<PokemonNameIdDto[]>({
        queryKey: ['pokemon-names'],
        queryFn: async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
            const data = await res.json();

            return data.results.map((p: { name: string; url: string }) => {
                const segments = p.url.split('/').filter(Boolean);
                const id = parseInt(segments[segments.length - 1], 10);

                return { name: p.name, id };
            });
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
    });
};