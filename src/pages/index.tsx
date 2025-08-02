import Head from 'next/head';
import { PokemonList } from '@/components/PokemonList';

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <Head>
                <title>Pokédex</title>
            </Head>
            <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>
            <PokemonList />
        </div>
    );
}
