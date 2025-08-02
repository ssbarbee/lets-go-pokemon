
import { Pokemon } from '@/types/pokemon';
import Link from 'next/link';
import { typeColors } from '@/components/PokemonDetails';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    const primaryType = pokemon.types[0].type.name;
    const gradient = typeColors[primaryType] || 'from-gray-300 to-gray-500';

    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <div
                className={`rounded-xl shadow-lg p-4 bg-gradient-to-br ${gradient} text-white hover:scale-105 transition cursor-pointer flex flex-col items-center`}
            >
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-24 h-24 mb-2 drop-shadow"
                />
                <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
                <div className="flex gap-2 mt-2 flex-wrap justify-center">
                    {pokemon.types.map((t) => (
                        <span
                            key={t.type.name}
                            className="text-xs bg-black bg-opacity-20 rounded-full px-2 py-1 capitalize"
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};