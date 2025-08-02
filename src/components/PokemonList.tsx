import { PokemonCard } from './PokemonCard';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import React, { useRef } from 'react';
import { FloatingBackground } from '@/components/FloatingBackground';
import { usePokemons } from '@/hooks/usePokemons';
import { useVirtualizer } from '@tanstack/react-virtual';

export const PokemonList = () => {
    const { data: pokemons = [], isLoading, isError } = usePokemons();
    const { query, handleSearch } = useSearchPokemon();

    const filtered = pokemons.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    const isLanding = query.trim() === '';

    const parentRef = useRef<HTMLDivElement>(null);

    const itemsPerRow = 4;
    const rowCount = Math.ceil(filtered.length / itemsPerRow);

    const virtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 220,
        overscan: 5,
    });

    return (
        <div className="relative min-h-screen bg-transparent">
            {/* Floating Background Always Present */}
            <div className={`absolute inset-0 z-0 transition-all duration-500 ${isLanding ? 'opacity-100' : 'opacity-50 backdrop-blur-sm bg-white/70'}`}>
                <FloatingBackground/>
            </div>

            {/* Sticky Header Input */}
            <div className="sticky top-0 z-50 bg-transparent backdrop-blur-md py-4 px-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Explore the world of Pokémon"
                    value={query}
                    onChange={handleSearch}
                    className="w-full max-w-xl px-6 py-4 text-2xl rounded-3xl border border-gray-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white placeholder-gray-400 text-center transition"
                />
            </div>

            {/* Results Grid (Only when searching) */}
            {!isLanding && (
                <div ref={parentRef} className="h-[80vh] overflow-auto px-4 pt-4 z-10 relative">
                    {isLoading && <div className="flex justify-center items-center h-full text-gray-500 text-xl">Loading...</div>}
                    {isError && <div className="flex justify-center items-center h-full text-red-500 text-xl">Failed to
                        fetch Pokémon.</div>}

                    {filtered.length === 0 && !isLoading && !isError ? (
                        <div className="flex justify-center items-center h-full text-gray-500 text-xl">
                            No Pokémon match your search.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative" style={{ height: virtualizer.getTotalSize() }}>
                            {virtualizer.getVirtualItems().map((virtualRow) => {
                                const startIndex = virtualRow.index * itemsPerRow;
                                const rowItems = filtered.slice(startIndex, startIndex + itemsPerRow);

                                return (
                                    <div
                                        key={virtualRow.index}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-6 absolute w-full"
                                        style={{ transform: `translateY(${virtualRow.start}px)` }}
                                    >
                                        {rowItems.map((pokemon) => (
                                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};