import type { Pokemon } from "@/types/Pokemon.ts";
const API_URL = 'http://localhost:3000';

interface GetPaginatedPokemonsParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
}

export async function getPaginatedPokemons(params: GetPaginatedPokemonsParams = {}): Promise<{ data: Pokemon[]; total: number }> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search) query.append('search', params.search);
    if (params.type) query.append('type', params.type);

    const response = await fetch(`${API_URL}/pokemons/paginated?${query.toString()}`);
    return response.json();
}

export function createNewPokemon(pokemon: Pokemon) {
    return fetch(`${API_URL}/pokemons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemon),
    }).then(response => response.json());
}

export function deletePokemon(id: number) {
    return fetch(`${API_URL}/pokemons/${id}`, {
        method: 'DELETE',
    }).then(response => response.json());
}