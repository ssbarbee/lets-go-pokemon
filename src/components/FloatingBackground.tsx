import Image from 'next/image';
import { useEffect, useState } from 'react';
import { floatingPokemons } from './constants';

export const FloatingBackground = () => {
    const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

    useEffect(() => {
        setPositions(
            floatingPokemons.map(() => ({
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
            }))
        );
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {floatingPokemons.map((poke, idx) => (
                <div
                    key={idx}
                    className="absolute group transition-all duration-300 ease-in-out"
                    style={{
                        top: positions[idx]?.top,
                        left: positions[idx]?.left,
                    }}
                >
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white bg-opacity-30 backdrop-blur-md group-hover:scale-125 transition">
                        <Image
                            src={poke.src}
                            alt={poke.label}
                            width={60}
                            height={60}
                            className="opacity-30 blur-sm group-hover:opacity-100 group-hover:blur-none transition duration-300"
                        />

                        {/* Static Concentric Circles on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {poke.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500"
                                    style={{
                                        width: `${80 + i * 16}px`,
                                        height: `${80 + i * 16}px`,
                                        border: `2px solid ${color}`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Label on Hover */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        {poke.label}
                    </div>
                </div>
            ))}
        </div>
    );
};