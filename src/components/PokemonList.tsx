import { PokemonCard } from './PokemonCard';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import { usePokemons } from '@/hooks/usePokemons';

export const PokemonList = () => {
    const { data: pokemons = [], isLoading, isError } = usePokemons();
    const { query, handleSearch } = useSearchPokemon();

    const filtered = pokemons.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to fetch Pokémon.</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search Pokémon"
                value={query}
                onChange={handleSearch}
                className="border px-3 py-2 rounded w-full mb-4"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filtered.map((p) => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </div>
        </div>
    );
};