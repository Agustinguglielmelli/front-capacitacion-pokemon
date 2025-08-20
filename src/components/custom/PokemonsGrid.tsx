import type { Pokemon } from "@/types/Pokemon.ts";
import { PokemonCard } from "@/components/custom/PokemonCard.tsx";
import { EditPokemonModal } from "@/components/custom/EditPokemonModal.tsx";
import { useState } from "react";

interface PokemonGridProps {
    pokemons: Pokemon[];
    handleDelete: (id: number) => void;
}

export function PokemonGrid({ pokemons, handleDelete }: PokemonGridProps) {
    const [isEditPokemonModalOpen, setIsEditPokemonModalOpen] = useState(false);
    const [pokemonToEdit, setPokemonToEdit] = useState<Pokemon | null>(null);

    const openEditPokemonModal = (pokemon: Pokemon) => {
        setPokemonToEdit(pokemon);
        setIsEditPokemonModalOpen(true);
    };
    const closeEditPokemonModal = () => {
        setIsEditPokemonModalOpen(false);
        setPokemonToEdit(null);
    };

    return (
        <div className="bg-white w-full h-full grid grid-cols-4 gap-4 p-4 overflow-auto">
            {pokemons.map((pokemon) => (
                <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id!}
                    name={pokemon.name}
                    type={pokemon.type}
                    imageUrl={pokemon.imageUrl}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    handleDelete={handleDelete}
                    handleEdit={() => openEditPokemonModal(pokemon)}
                />
            ))}
            <EditPokemonModal
                isOpen={isEditPokemonModalOpen}
                onClose={closeEditPokemonModal}
                pokemon={pokemonToEdit ?? undefined}
            />
        </div>
    );
}