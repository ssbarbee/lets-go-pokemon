import { PokemonCard } from './PokemonCard';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import { usePokemons } from '@/hooks/usePokemons';
import React from 'react';
import { FloatingBackground } from '@/components/FloatingBackground';

export const PokemonList = () => {
    const { data: pokemons = [], isLoading, isError } = usePokemons();
    const { query, handleSearch } = useSearchPokemon();

    const filtered = pokemons.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    const isLanding = query.trim() === '';

    return (
        <div className={`relative min-h-screen ${isLanding ? 'backdrop-blur-md' : ''}`}>
            <div
                className={`${
                    isLanding ? 'flex justify-center items-center min-h-screen' : ''
                }`}
            >
                <input
                    type="text"
                    placeholder="Explore the world of Pokémon"
                    value={query}
                    onChange={handleSearch}
                    className="w-full max-w-xl px-6 py-4 text-2xl rounded-3xl border border-gray-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white backdrop-blur-sm placeholder-gray-400 text-center transition"
                />
            </div>

            {!isLanding && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Failed to fetch Pokémon.</div>}
                    {filtered.map((p) => (
                        <PokemonCard key={p.id} pokemon={p}/>
                    ))}
                </div>
            )}
            {isLanding && (<FloatingBackground />)}
        </div>
    );
};