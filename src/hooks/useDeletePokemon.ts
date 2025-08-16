import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deletePokemon} from "@/api/api.ts";

export function useDeletePokemon() {

    const query = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: number) => deletePokemon(id),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ["pokemons"]});
        },
    });

    return {
        deletePokemon: mutation.mutate,
        error: mutation.error,
    }
}
