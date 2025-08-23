import {useQuery} from "@tanstack/react-query";
import {getPokemonById} from "@/api/api.ts";

export function useGetPokemonsByItsId(id: string | undefined) {
    const { isPending, data } = useQuery(
        {
            queryKey: ["pokemonById", id],
            queryFn: () => getPokemonById(id),
        });

    return {
        isPending, data
    }
}