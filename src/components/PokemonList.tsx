import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from '@/types/pokemon';
import { PokemonCard } from './PokemonCard';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';

export const PokemonList = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { query, handleSearch } = useSearchPokemon();

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
                const promises = res.data.results.map((p: { url: string }) => axios.get(p.url));
                const responses = await Promise.all(promises);
                setPokemons(responses.map((r) => r.data));
            } catch (err) {
                setError('Failed to fetch Pokémon.');
            } finally {
                setLoading(false);
            }
        };
        fetchPokemons();
    }, []);

    const filtered = pokemons.filter((p) => p.name.includes(query.toLowerCase()));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
