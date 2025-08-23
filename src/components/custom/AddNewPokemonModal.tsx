import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNewPokemon} from "@/api/api.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@radix-ui/react-dialog";
import {DialogFooter, DialogHeader} from "@/components/shadcn/dialog.tsx";
import {Button} from "@/components/shadcn/button.tsx";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/shadcn/input.tsx";

export function AddNewPokemonModal() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNewPokemon,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["pokemons"]});
        },
        onError: (error) => {
            console.error("Error creating Pokémon:", error);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const pokemonData = {
            name: formData.get("name") as string,
            type: formData.get("type") as string,
            height: Number(formData.get("height")),
            weight: Number(formData.get("weight")),
            imageUrl: formData.get("imageUrl") as string,
        };

        mutation.mutate(pokemonData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add new Pokemon</Button>
            </DialogTrigger>
            <DialogContent className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg border">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Pokemon</DialogTitle>
                        <DialogDescription>
                            Add a new Pokemon to your collection.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Pokemon name" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="type">Type</Label>
                            <Input id="type" name="type" placeholder="Pokemon type" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="height">Height</Label>
                            <Input id="height" name="height" type="number" placeholder="Height" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="weight">Weight</Label>
                            <Input id="weight" name="weight" type="number" placeholder="Weight" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" placeholder="Image URL" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Creating..." : "Create Pokemon"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}