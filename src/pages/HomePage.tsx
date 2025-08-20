import { useState } from "react";
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
import {usePaginatedPokemons} from "@/hooks/usePaginatedPokemons.ts";
import {PokemonFiltersForm} from "@/components/custom/PokemonFiltersForm.tsx";
import {PokemonGrid} from "@/components/custom/PokemonsGrid.tsx";
import {Button} from "@/components/shadcn/button.tsx";
import {AddNewPokemonModal} from "@/components/custom/AddNewPokemonModal.tsx";
import {useDeletePokemon} from "@/hooks/useDeletePokemon.ts";

export function HomePage() {
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const { data, refetch, isFetching } = usePaginatedPokemons({ page, limit, search, type: typeFilter });
    const pokemons: Pokemon[] = data?.data || [];

    const [isCreatePokemonModalOpen, setIsCreatePokemonModalOpen] = useState(false);

    const { deletePokemon} = useDeletePokemon();

    const openCreatePokemonModal = () => setIsCreatePokemonModalOpen(true);
    const closeCreatePokemonModal = () => setIsCreatePokemonModalOpen(false);


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


    const handleDelete = (id: number) => {
        console.log("Deleting pokemon with id:", id);
        deletePokemon(id);
    }


    return (
        <div className="mx-auto flex flex-col items-center h-screen bg-red-500 py-4">
            <Header/>

            <div className="flex space-x-4 items-center justify-center mb-4">
                <Button variant="secondary" onClick={openCreatePokemonModal}> Add new Pokemon </Button>
                <AddNewPokemonModal isOpen={isCreatePokemonModalOpen} onClose={closeCreatePokemonModal} />
                <PokemonFiltersForm
                    search={search}
                    typeFilter={typeFilter}
                    setSearch={setSearch}
                    setTypeFilter={setTypeFilter}
                    onSearch={handleSearch}
                />
            </div>

                <PokemonGrid pokemons={pokemons} handleDelete= {handleDelete} />

                {isFetching && <div className="mt-2 text-white">Cargando...</div>}

                <Pagination className="my-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className="cursor-pointer" onClick={handlePrev}
                                                aria-disabled={page === 1}/>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink isActive>{page}</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext className="cursor-pointer" onClick={handleNext}
                                            aria-disabled={data && page >= Math.ceil(data.total / limit)}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
    );
}
