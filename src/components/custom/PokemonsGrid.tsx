import type {Pokemon} from "@/types/Pokemon.ts";
import {PokemonCard} from "@/components/custom/PokemonCard.tsx";

interface PokemonGridProps {
    pokemons: Pokemon[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
    return (
        <div className="bg-white w-full h-full grid grid-cols-4 gap-4 p-4 overflow-auto">
            {pokemons.map((pokemon) => (
                <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    type={pokemon.type}
                    imageUrl={pokemon.imageUrl}
                />
            ))}
        </div>
    );
}
