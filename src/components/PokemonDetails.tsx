import { useState } from 'react';
import { useEvolutionChain } from '@/hooks/useEvolutionChain';
import { EvolutionDrawer } from './EvolutionDrawer';
import { Pokemon, PokemonType } from '@/types/pokemon';
import { BeakerIcon } from '@heroicons/react/24/solid';

const typeColorHexMap: Record<PokemonType, string> = {
    fire: '#FF7F50',
    water: '#5DADE2',
    grass: '#58D68D',
    electric: '#F4D03F',
    psychic: '#D98880',
    normal: '#BFC9CA',
    ice: '#A8E6FF',
    rock: '#BCAAA4',
    ground: '#D7CCC8',
    bug: '#A8B820',
    fighting: '#C62828',
    flying: '#81D4FA',
    ghost: '#7E57C2',
    poison: '#AB47BC',
    steel: '#B0BEC5',
    dragon: '#5C6BC0',
    fairy: '#F8BBD0',
    dark: '#616161',
};

const typeColorHex = (type: PokemonType): string => {
    return typeColorHexMap[type] || '#BDC3C7';
};

const typeColors: Record<PokemonType, string> = {
    fire: 'from-orange-400 to-red-600',
    water: 'from-blue-400 to-blue-700',
    grass: 'from-green-400 to-green-700',
    electric: 'from-yellow-300 to-yellow-600',
    psychic: 'from-pink-400 to-pink-600',
    normal: 'from-gray-300 to-gray-500',
    ice: 'from-blue-200 to-blue-400',
    rock: 'from-yellow-400 to-yellow-700',
    ground: 'from-yellow-500 to-orange-700',
    bug: 'from-lime-400 to-green-600',
    fighting: 'from-red-400 to-red-700',
    flying: 'from-blue-200 to-blue-500',
    ghost: 'from-purple-400 to-purple-700',
    poison: 'from-fuchsia-400 to-fuchsia-700',
    steel: 'from-gray-400 to-gray-600',
    dragon: 'from-indigo-500 to-purple-800',
    fairy: 'from-pink-300 to-pink-600',
    dark: 'from-gray-700 to-gray-900',
};

export const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
    const { data: evolutions = [] } = useEvolutionChain(pokemon.id);
    const [showDrawer, setShowDrawer] = useState(false);

    const primaryType = pokemon.types[0].type.name;
    const gradient = typeColors[primaryType] || 'from-gray-300 to-gray-500';
    const colorHex = typeColorHex(primaryType);

    return (
        <>
            <div className={`min-h-screen p-6 rounded-xl shadow-xl bg-gradient-to-br ${gradient} text-white max-w-md mx-auto flex-1 relative`}>
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                            className={`w-40 h-40 mb-4 drop-shadow-lg rounded-full type-aura`}
                            style={{ border: `5px solid ${colorHex}` }}
                        />
                        {evolutions && evolutions.length > 1 && (
                            <button
                                onClick={() => setShowDrawer(true)}
                                className="absolute bottom-3 right-0 rounded-full p-2 shadow-lg transition"
                                style={{ backgroundColor: colorHex }}
                                aria-label="Show Evolution Drawer"
                            >
                                <BeakerIcon className="w-6 h-6 text-white" />
                            </button>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                    <div className="flex gap-2 mt-2">
                        {pokemon.types.map((t) => (
                            <span key={t.type.name} className="text-sm bg-black bg-opacity-20 rounded-full px-3 py-1">
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 w-full">
                        <h2 className="text-lg font-semibold mb-2">Stats</h2>
                        <div className="space-y-2">
                            {pokemon.stats.map((s) => (
                                <div key={s.stat.name}>
                                    <div className="flex justify-between text-sm">
                                        <span className="capitalize">{s.stat.name}</span>
                                        <span>{s.base_stat}</span>
                                    </div>
                                    <div className="w-full bg-white bg-opacity-20 h-3 rounded overflow-hidden">
                                        <div
                                            className="h-full bg-white bg-opacity-70 rounded transition-all duration-1000"
                                            style={{ width: `${s.base_stat / 2}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showDrawer && (
                <EvolutionDrawer
                    evolutions={evolutions}
                    gradient={gradient}
                    onClose={() => setShowDrawer(false)}
                />
            )}
        </>
    );
};