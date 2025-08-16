import {Button} from "@/components/shadcn/button.tsx";

interface PokemonFiltersProps {
    search: string;
    typeFilter: string;
    setSearch: (s: string) => void;
    setTypeFilter: (t: string) => void;
    onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function PokemonFiltersForm({ search, typeFilter, setSearch, setTypeFilter, onSearch }: PokemonFiltersProps) {
    return (
            <form onSubmit={onSearch} className="flex gap-2 mb-4">
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
                <Button type="submit" className="px-3 py-1  rounded border cursor-pointer">
                    Buscar
                </Button>
            </form>
    );
}
