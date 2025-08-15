import type {Pokemon} from "@/types/Pokemon.ts";
const API_URL = 'http://localhost:3000';

export async function getAllPokemons(): Promise<Pokemon[]> {
    const response = await fetch(API_URL + '/pokemons');
    return response.json();
}