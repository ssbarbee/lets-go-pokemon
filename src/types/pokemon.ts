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