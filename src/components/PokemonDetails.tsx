import { Pokemon } from '@/types/pokemon';

export const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <div className="p-4 border rounded-lg shadow">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32 mx-auto" />
            <h1 className="text-2xl text-center font-bold mt-2 capitalize">{pokemon.name}</h1>
            <div className="flex justify-center gap-3 mt-2">
                {pokemon.types.map((t) => (
                    <span key={t.type.name} className="text-sm bg-blue-100 rounded px-2 py-1">
            {t.type.name}
          </span>
                ))}
            </div>
        </div>
    );
};
