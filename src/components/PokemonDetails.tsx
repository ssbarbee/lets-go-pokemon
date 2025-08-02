import { useEvolutionChain } from '@/hooks/useEvolutionChain';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';

export const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
    const { data: evolutions } = useEvolutionChain(pokemon.id);

    const primaryType = pokemon.types[0].type.name;

    const typeColors: Record<string, string> = {
        fire: 'from-orange-400 to-red-600',
        water: 'from-blue-400 to-blue-700',
        grass: 'from-green-400 to-green-700',
        electric: 'from-yellow-300 to-yellow-600',
        psychic: 'from-pink-400 to-pink-600',
        normal: 'from-gray-300 to-gray-500',
        // Add more as needed
    };

    const gradient = typeColors[primaryType] || 'from-gray-300 to-gray-500';

    return (
        <div className={`p-6 rounded-xl shadow-xl bg-gradient-to-br ${gradient} text-white max-w-md mx-auto`}>
            <div className="flex flex-col items-center">
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-40 h-40 mb-4 drop-shadow-lg" />
                <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                <div className="flex gap-2 mt-2">
                    {pokemon.types.map((t) => (
                        <span key={t.type.name} className="text-sm bg-black bg-opacity-20 rounded-full px-3 py-1">
                            {t.type.name}
                        </span>
                    ))}
                </div>

                {evolutions && evolutions.length > 1 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Evolution Chain</h2>
                        <div className="flex gap-4 justify-center">
                            {evolutions.map((name) => (
                                <Link key={name} href={`/pokemon/${name}`} className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black capitalize shadow-md hover:scale-110 transition">
                                        {name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Base Stats</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {pokemon.stats.map((s) => (
                            <div key={s.stat.name} className="flex justify-between bg-black bg-opacity-20 rounded px-2 py-1 text-sm">
                                <span className="capitalize">{s.stat.name}</span>
                                <span>{s.base_stat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};