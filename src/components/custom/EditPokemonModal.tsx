import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePokemon } from "@/api/api.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/shadcn/dialog.tsx";
import { Button } from "@/components/shadcn/button.tsx";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/shadcn/input.tsx";
import type { Pokemon } from "@/types/Pokemon.ts";

export function EditPokemonModal({ isOpen, onClose, pokemon }: { isOpen: boolean; onClose: () => void; pokemon?: Pokemon }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updatePokemon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pokemons"] });
            onClose();
        },
        onError: (error) => {
            console.error("Error updating Pokémon:", error);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!pokemon) return;

        const formData = new FormData(e.currentTarget);

        const updatedPokemon = {
            ...pokemon,
            name: formData.get("name") as string,
            type: formData.get("type") as string,
            height: Number(formData.get("height")),
            weight: Number(formData.get("weight")),
            imageUrl: formData.get("imageUrl") as string,
        };

        mutation.mutate(updatedPokemon);
    };

    if (!pokemon) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg border">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Pokemon</DialogTitle>
                        <DialogDescription>
                            Update the Pokemon information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={pokemon.name}
                                placeholder="Pokemon name"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="type">Type</Label>
                            <Input
                                id="type"
                                name="type"
                                defaultValue={pokemon.type}
                                placeholder="Pokemon type"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="height">Height</Label>
                            <Input
                                id="height"
                                name="height"
                                type="number"
                                defaultValue={pokemon.height}
                                placeholder="Height"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="weight">Weight</Label>
                            <Input
                                id="weight"
                                name="weight"
                                type="number"
                                defaultValue={pokemon.weight}
                                placeholder="Weight"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                defaultValue={pokemon.imageUrl}
                                placeholder="Image URL"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Updating..." : "Update Pokemon"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}