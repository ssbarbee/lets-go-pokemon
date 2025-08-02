import { useQuery } from '@tanstack/react-query';

export const useEvolutionChain = (pokemonId: number) => {
    return useQuery({
        queryKey: ['evolution', pokemonId],
        queryFn: async () => {
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
            const speciesData = await speciesRes.json();

            const evolutionChainUrl = speciesData.evolution_chain.url;
            const evolutionRes = await fetch(evolutionChainUrl);
            const evolutionData = await evolutionRes.json();

            const chain = [];
            let current = evolutionData.chain;

            while (current) {
                chain.push(current.species.name);
                current = current.evolves_to[0];
            }

            return chain;
        },
        enabled: !!pokemonId,
    });
};