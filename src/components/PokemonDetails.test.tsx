import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDetails } from './PokemonDetails';
import { useEvolutionChain } from '@/hooks/useEvolutionChain';
import { Pokemon } from '@/hooks/usePokemonDetails';

// Mock useEvolutionChain hook
jest.mock('@/hooks/useEvolutionChain', () => ({
    useEvolutionChain: jest.fn(),
}));

// Mock EvolutionDrawer component
jest.mock('./EvolutionDrawer', () => ({
    EvolutionDrawer: ({ evolutions, onClose }: any) => (
        <div data-testid="evolution-drawer">
            {evolutions.map((evo: any) => (
                <span key={evo.id}>{evo.name}</span>
            ))}
            <button onClick={onClose}>Close</button>
        </div>
    ),
}));

const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
        front_default: '',
        other: {
            'official-artwork': {
                front_default: 'https://example.com/bulbasaur.png',
            },
        },
    },
    types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } },
    ],
    stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } },
    ],
    abilities: [],
};

describe('PokemonDetails', () => {
    beforeEach(() => {
        (useEvolutionChain as jest.Mock).mockReturnValue({
            data: [
                { id: 1, name: 'bulbasaur', sprite: 'https://example.com/bulbasaur.png' },
                { id: 2, name: 'ivysaur', sprite: 'https://example.com/ivysaur.png' },
            ],
        });
    });

    it('renders pokemon details correctly', () => {
        render(<PokemonDetails pokemon={mockPokemon} />);

        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('grass')).toBeInTheDocument();
        expect(screen.getByText('poison')).toBeInTheDocument();
        expect(screen.getByText('hp')).toBeInTheDocument();
        expect(screen.getByText('attack')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Show Evolution Drawer/i })).toBeInTheDocument();
    });

    it('opens Evolution Drawer when button is clicked', () => {
        render(<PokemonDetails pokemon={mockPokemon} />);

        const button = screen.getByRole('button', { name: /Show Evolution Drawer/i });
        fireEvent.click(button);

        expect(screen.getByTestId('evolution-drawer')).toBeInTheDocument();
        expect(screen.getByText('ivysaur')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByTestId('evolution-drawer')).not.toBeInTheDocument();
    });
});