import Head from 'next/head';
import { PokemonList } from '@/components/PokemonList';

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <Head>
                <title>Let's go Pokémon!</title>
            </Head>
            <PokemonList />
        </div>
    );
}
