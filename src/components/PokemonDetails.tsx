import { useState, useRef } from 'react';
import { useEvolutionChain } from '@/hooks/useEvolutionChain';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';
import { ArrowRightIcon, BeakerIcon, XMarkIcon } from '@heroicons/react/24/solid';

const typeColorHex = (type: string) => {
    const map: Record<string, string> = {
        fire: '#FF7F50',
        water: '#5DADE2',
        grass: '#58D68D',
        electric: '#F4D03F',
        psychic: '#D98880',
        normal: '#BFC9CA',
    };
    return map[type] || '#BDC3C7';
};

const typeColors: Record<string, string> = {
    fire: 'from-orange-400 to-red-600',
    water: 'from-blue-400 to-blue-700',
    grass: 'from-green-400 to-green-700',
    electric: 'from-yellow-300 to-yellow-600',
    psychic: 'from-pink-400 to-pink-600',
    normal: 'from-gray-300 to-gray-500',
};

export const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
    const { data: evolutions = [] } = useEvolutionChain(pokemon.id);
    const [showDrawer, setShowDrawer] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const startY = useRef<number>(0);

    const primaryType = pokemon.types[0].type.name;
    const gradient = typeColors[primaryType] || 'from-gray-300 to-gray-500';
    const colorHex = typeColorHex(primaryType);

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!drawerRef.current) return;
        const deltaY = e.touches[0].clientY - startY.current;

        if (deltaY > 0) {
            drawerRef.current.style.transform = `translateY(${deltaY}px)`;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!drawerRef.current) return;
        const deltaY = e.changedTouches[0].clientY - startY.current;

        if (deltaY > 100) {
            setShowDrawer(false);
        } else {
            drawerRef.current.style.transform = 'translateY(0)';
        }
    };

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

            {/* Evolution Drawer */}
            {showDrawer && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowDrawer(false)}></div>

                    <div
                        ref={drawerRef}
                        className={`relative bg-gradient-to-br ${gradient} rounded-t-2xl p-4 text-white h-1/3 w-full shadow-xl animate-slide-up`}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Evolution Chain</h2>
                            <button
                                onClick={() => setShowDrawer(false)}
                                aria-label="Close Drawer"
                            >
                                <XMarkIcon className="w-6 h-6 text-white"/>
                            </button>
                        </div>
                        <div className="flex gap-4 items-center overflow-x-auto pb-2">
                            {evolutions.map((evo, index) => (
                                <div key={evo.id} className="flex items-center gap-4 px-1 py-2">
                                    <Link onClick={() => setShowDrawer(false)} href={`/pokemon/${evo.id}`} className="flex-shrink-0 text-center">
                                        <div
                                            className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition overflow-hidden">
                                            <img src={evo.sprite} alt={evo.name}
                                                 className="w-full h-full object-contain"/>
                                        </div>
                                        <span className="mt-1 block text-xs capitalize">{evo.name}</span>
                                    </Link>
                                    {index !== evolutions.length - 1 && (
                                        <ArrowRightIcon className="w-5 h-5 text-white"/>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
