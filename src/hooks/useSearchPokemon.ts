import { useState } from 'react';

export const useSearchPokemon = () => {
    const [query, setQuery] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    return { query, handleSearch };
};
