import { useQuery } from "@tanstack/react-query";
import { getPaginatedPokemons } from "@/api/api";
import type { Pokemon } from "@/types/Pokemon";

interface UsePaginatedPokemonsParams {
    page: number;
    limit: number;
    search?: string;
    type?: string;
}

export function usePaginatedPokemons({ page, limit, search, type }: UsePaginatedPokemonsParams) {
    return useQuery<{ data: Pokemon[]; total: number }>({
        queryKey: ["pokemons", page, search, type],
        queryFn: () => getPaginatedPokemons({ page, limit, search, type }),
    });
}
