import { useQuery } from '@tanstack/react-query';

export const POKEMON_TYPES = [
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'normal',
    'ice',
    'rock',
    'ground',
    'bug',
    'fighting',
    'flying',
    'ghost',
    'poison',
    'steel',
    'dragon',
    'fairy',
    'dark',
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: { type: { name: PokemonType } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string } }[];
}

const fetchPokemon = async (id: string | number): Promise<Pokemon> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Failed to fetch Pokémon details');
    return res.json();
};

export const usePokemonDetails = (id: string | number | undefined) => {
    return useQuery<Pokemon>({
        queryKey: ['pokemon', id],
        queryFn: () => fetchPokemon(id!),
        enabled: !!id, // Prevent query from running if id is undefined
    });
};