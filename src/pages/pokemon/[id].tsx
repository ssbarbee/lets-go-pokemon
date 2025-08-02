import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from '@/types/pokemon';
import { PokemonDetails } from '@/components/PokemonDetails';

const PokemonPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetchPokemon = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(res.data);
            } catch {
                setError('Failed to fetch Pokémon details.');
            } finally {
                setLoading(false);
            }
        };
        fetchPokemon();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!pokemon) return null;

    return (
        <div className="container mx-auto p-4">
            <PokemonDetails pokemon={pokemon} />
        </div>
    );
};

export default PokemonPage;