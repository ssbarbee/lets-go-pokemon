import { render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';
import { usePokemons } from '@/hooks/usePokemons';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';

jest.mock('@/hooks/usePokemons');
jest.mock('@/hooks/useSearchPokemon');
jest.mock('@/components/FloatingBackground', () => ({
    FloatingBackground: () => <div data-testid="floating-background" />,
}));
jest.mock('./PokemonCard', () => ({
    PokemonCard: ({ pokemon }: any) => <div data-testid="pokemon-card">{pokemon.name}</div>,
}));

jest.mock('@tanstack/react-virtual', () => ({
    useVirtualizer: () => ({
        getTotalSize: () => 1000,
        getVirtualItems: () => [
            { index: 0, start: 0 },
            { index: 1, start: 220 },
            { index: 2, start: 440 },
        ],
    }),
}));

describe('PokemonList', () => {
    it('renders landing page with floating background', () => {
        (usePokemons as jest.Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
        (useSearchPokemon as jest.Mock).mockReturnValue({ query: '', handleSearch: jest.fn() });

        render(<PokemonList />);

        expect(screen.getByPlaceholderText('Explore the world of Pokémon')).toBeInTheDocument();
        expect(screen.getByTestId('floating-background')).toBeInTheDocument();
    });

    it('renders loading state', () => {
        (usePokemons as jest.Mock).mockReturnValue({ data: [], isLoading: true, isError: false });
        (useSearchPokemon as jest.Mock).mockReturnValue({ query: 'pikachu', handleSearch: jest.fn() });

        render(<PokemonList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        (usePokemons as jest.Mock).mockReturnValue({ data: [], isLoading: false, isError: true });
        (useSearchPokemon as jest.Mock).mockReturnValue({ query: 'pikachu', handleSearch: jest.fn() });

        render(<PokemonList />);

        expect(screen.getByText('Failed to fetch Pokémon.')).toBeInTheDocument();
    });

    it('renders no results message when filtered list is empty', () => {
        (usePokemons as jest.Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
        (useSearchPokemon as jest.Mock).mockReturnValue({ query: 'unknown', handleSearch: jest.fn() });

        render(<PokemonList />);

        expect(screen.getByText('No Pokémon match your search.')).toBeInTheDocument();
    });

    it('renders filtered Pokémon list', () => {
        const mockData = [
            { id: 1, name: 'bulbasaur' },
            { id: 2, name: 'ivysaur' },
        ];
        (usePokemons as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, isError: false });
        (useSearchPokemon as jest.Mock).mockReturnValue({ query: 'bulb', handleSearch: jest.fn() });

        render(<PokemonList />);

        expect(screen.getByTestId('pokemon-card')).toHaveTextContent('bulbasaur');
    });
});