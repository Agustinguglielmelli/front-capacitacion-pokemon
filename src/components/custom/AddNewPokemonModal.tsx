import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNewPokemon} from "@/api/api.ts";


export function AddNewPokemonModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: createNewPokemon,
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ["pokemons"] });
            onClose();
        },
        onError: (error) => {
            console.error("Error creating Pokémon:", error);
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            name,
            type,
            height,
            weight,
            imageUrl
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">
                <button onClick={onClose}>Cerrar</button>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type="string" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre"/>
                    <input type="string" value={type} onChange={(e) => setType(e.target.value)} placeholder="Tipo"/>
                    <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} placeholder="Altura"/>
                    <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} placeholder="Peso"/>
                    <input type="string" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL de imagen"/>
                    <button type="submit" >Crear Pokémon</button>
                </form>
            </div>
        </div>
    );
}
