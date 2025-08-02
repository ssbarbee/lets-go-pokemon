import { Pokemon } from '@/types/pokemon';
import Link from 'next/link';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <div className="border rounded-lg p-4 shadow hover:scale-105 transition cursor-pointer">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 mx-auto" />
                <h2 className="text-center text-lg font-bold capitalize">{pokemon.name}</h2>
                <div className="flex justify-center gap-2 mt-2">
                    {pokemon.types.map((t) => (
                        <span key={t.type.name} className="text-xs bg-gray-200 rounded px-2 py-1">
            {t.type.name}
          </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};