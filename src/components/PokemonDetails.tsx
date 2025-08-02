import { useEvolutionChain } from '@/hooks/useEvolutionChain';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';

const typeColorHex = (type: string) => {
    const map: Record<string, string> = {
        fire: '#FF7F50',
        water: '#5DADE2',
        grass: '#58D68D',
        electric: '#F4D03F',
        psychic: '#D98880',
        normal: '#BFC9CA',
        // Add more...
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
    // Add more as needed
};

export const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
    const { data: evolutions } = useEvolutionChain(pokemon.id);

    const primaryType = pokemon.types[0].type.name;


    const gradient = typeColors[primaryType] || 'from-gray-300 to-gray-500';

    return (
        <div className={`p-6 rounded-xl shadow-xl bg-gradient-to-br ${gradient} text-white max-w-md mx-auto flex-1`}>
            <div className="flex flex-col items-center">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className={`w-40 h-40 mb-4 drop-shadow-lg rounded-full type-aura`}
                    style={{border: `5px solid ${typeColorHex(primaryType)}`}} // Helper to get hex color
                />                <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
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
                        <div className="flex gap-6 justify-center">
                            {evolutions.map((evo) => (
                                <Link key={evo.id} href={`/pokemon/${evo.id}`} className="text-center">
                                    <div
                                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition overflow-hidden">
                                        <img src={evo.sprite} alt={evo.name} className="w-full h-full object-contain"/>
                                    </div>
                                    <span className="mt-1 block text-xs capitalize">{evo.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

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
                                        style={{width: `${s.base_stat / 2}%`}}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};