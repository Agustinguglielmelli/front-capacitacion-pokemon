import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "@/components/custom/PokemonCard.tsx";
import { Header } from "@/components/custom/Header.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/shadcn/pagination";
import type { Pokemon } from "@/types/Pokemon";
import { getPaginatedPokemons } from "@/api/api";

export function HomePage() {
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const { data, refetch, isFetching } = useQuery<{ data: Pokemon[]; total: number }>({
        queryKey: ["pokemons", page, search, typeFilter],
        queryFn: () => getPaginatedPokemons({ page, limit, search: search || undefined, type: typeFilter || undefined }),
    });

    const pokemons: Pokemon[] = data?.data || [];

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (data && page < Math.ceil(data.total / limit)) setPage((prev) => prev + 1);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);
        refetch();
    };

    return (
        <div className="mx-auto flex flex-col items-center h-screen bg-red-500 py-4">
            <Header />

            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Filtrar por tipo"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300"
                />
                <button type="submit" className="px-3 py-1 bg-white rounded border">
                    Buscar
                </button>
            </form>

            <div className="bg-white w-full h-full grid grid-cols-4 gap-4 p-4 overflow-auto">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        name={pokemon.name}
                        type={pokemon.type}
                        imageUrl={pokemon.imageUrl}
                    />
                ))}
            </div>

            {isFetching && <div className="mt-2 text-white">Cargando...</div>}

            <Pagination className="my-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className="cursor-pointer" onClick={handlePrev} aria-disabled={page === 1} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext className="cursor-pointer" onClick={handleNext} aria-disabled={data && page >= Math.ceil(data.total / limit)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
