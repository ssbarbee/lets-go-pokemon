import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonCard } from "./PokemonCard";
import { useInView } from "react-intersection-observer";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import "@testing-library/jest-dom";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("@/hooks/usePokemonDetails", () => ({
  usePokemonDetails: jest.fn(),
}));

describe("PokemonCard", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
  };

  beforeEach(() => {
    (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });
    (usePokemonDetails as jest.Mock).mockReturnValue({
      data: {
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      },
      isLoading: false,
      isError: false,
    });
  });

  it("renders Pokemon name and types", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toHaveAttribute("src", expect.stringContaining("1.png"));
  });

  it("renders fallback image on error", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const img = screen.getByRole("img") as HTMLImageElement;

    // Fire error event to simulate image load failure
    fireEvent.error(img);

    expect(img.src).toContain("25.png");
  });

  it("renders loading state gracefully", () => {
    (usePokemonDetails as jest.Mock).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.queryByText("grass")).not.toBeInTheDocument();
  });

  it("renders error state gracefully", () => {
    (usePokemonDetails as jest.Mock).mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.queryByText("grass")).not.toBeInTheDocument();
  });
});
