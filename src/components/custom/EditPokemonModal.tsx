import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Pokemon } from "@/types/Pokemon.ts";
import { Button } from "@/components/shadcn/button.tsx";
import {updatePokemon} from "@/api/api.ts";



export function EditPokemonModal({ isOpen, onClose, pokemon }: { isOpen: boolean; onClose: () => void; pokemon?: Pokemon }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updatePokemon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pokemons"] });
            onClose();
        },
    });

    useEffect(() => {
        if (pokemon) {
            setName(pokemon.name);
            setType(pokemon.type);
            setHeight(pokemon.height);
            setWeight(pokemon.weight);
            setImageUrl(pokemon.imageUrl);
        }
    }, [pokemon]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pokemon) return;
        mutation.mutate({
            ...pokemon,
            name,
            type,
            height,
            weight,
            imageUrl,
        });
    };

    if (!isOpen || !pokemon) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded w-80">
                <button onClick={onClose} className="mb-2">Cerrar</button>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
                    <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Tipo" />
                    <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} placeholder="Altura" />
                    <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} placeholder="Peso" />
                    <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL de imagen" />
                    <Button type="submit">
                        Actualizar Pokémon
                    </Button>
                    {mutation.error && <span className="text-red-500 text-xs">Error al guardar</span>}
                </form>
            </div>
        </div>
    );
}