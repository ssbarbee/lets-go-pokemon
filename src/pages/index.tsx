import Head from "next/head";
import { PokemonList } from "@/components/PokemonList";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Let&apos;s go Pokémon!</title>
      </Head>
      <PokemonList />
    </div>
  );
}
