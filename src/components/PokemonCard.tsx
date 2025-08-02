import Link from 'next/link';
import { PokemonNameIdDto } from '@/hooks/usePokemons';
import { useInView } from 'react-intersection-observer';
import Image, { ImageProps } from 'next/image';
import { usePokemonDetails } from '@/hooks/usePokemonDetails';
import { typeColors } from '@/components/PokemonDetails';
import { useState } from 'react';

export const PokemonImage = (props: ImageProps) => {
    const [imgSrc, setImgSrc] = useState(props.src);

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => setImgSrc('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png')}
        />
    );
};

export const PokemonCard = ({ pokemon: { id, name } }: { pokemon: PokemonNameIdDto }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { data: pokemon, isLoading, isError } = usePokemonDetails(inView ? name : '');

    const primaryType = pokemon?.types[0]?.type.name;
    const gradient = primaryType ? (typeColors[primaryType] || 'from-gray-300 to-gray-500') : 'from-gray-200 to-gray-400';

    return (
        <Link href={`/pokemon/${id}`} legacyBehavior>
            <a
                ref={ref}
                className={`rounded-xl shadow-lg p-4 bg-gradient-to-br ${gradient} text-white hover:scale-105 transition cursor-pointer flex flex-col items-center
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400`}
            >
                <PokemonImage
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={name}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="mb-2 drop-shadow"
                />
                <h2 className="text-lg font-bold capitalize truncate w-full text-center" title={name}>{name}</h2>
                <div className="flex gap-2 mt-2 flex-wrap justify-center">
                    {pokemon && !isLoading && !isError && (
                        <>
                            {pokemon.types.map((t) => (
                                <span
                                    key={t.type.name}
                                    className="text-xs bg-black bg-opacity-20 rounded-full px-2 py-1 capitalize"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </>
                    )}
                </div>
            </a>
        </Link>
    );
};