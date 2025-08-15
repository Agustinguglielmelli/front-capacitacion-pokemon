import {Header} from "@/components/Header.tsx";
import {PokemonCard} from "@/components/ui/PokemonCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllPokemons} from "@/api/api.ts";
import type {Pokemon} from "@/types/Pokemon.ts";

export function HomePage() {

    const { data } = useQuery({
        queryKey: ["pokemon"],
        queryFn: getAllPokemons
    })

  return (
    <div className="flex flex-col items-center h-screen bg-red-500">
        <Header/>
        <div className="bg-white w-full h-full">
            {data?.map((pokemon: Pokemon) => (
                <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    type={pokemon.type}
                    imageUrl={pokemon.imageUrl}
                />
            ))}
        </div>
    </div>
  );
}