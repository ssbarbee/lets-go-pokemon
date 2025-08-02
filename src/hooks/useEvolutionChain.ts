import { useQuery } from "@tanstack/react-query";

export interface EvolutionData {
  name: string;
  id: number;
  sprite: string;
}

export const useEvolutionChain = (pokemonId: number) => {
  return useQuery({
    queryKey: ["evolution", pokemonId],
    queryFn: async (): Promise<EvolutionData[]> => {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      const speciesData = await speciesRes.json();

      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionRes = await fetch(evolutionChainUrl);
      const evolutionData = await evolutionRes.json();

      const chain: EvolutionData[] = [];
      let current = evolutionData.chain;

      while (current) {
        const name = current.species.name;
        const idMatch = current.species.url.match(/\/(\d+)\/$/);
        const id = idMatch ? parseInt(idMatch[1], 10) : null;

        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokeData = await pokeRes.json();

        if (id) {
          chain.push({
            name,
            id,
            sprite: pokeData.sprites.front_default,
          });
        }

        current = current.evolves_to[0];
      }

      return chain;
    },
    enabled: !!pokemonId,
  });
};
