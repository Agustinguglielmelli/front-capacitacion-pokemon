import {Input} from "@/components/shadcn/input.tsx";

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
                <Input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-2 py-1 rounded border bg-white text-black"
                />
                <Input
                    type="text"
                    placeholder="Filtrar por tipo"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-2 py-1 rounded border bg-white text-black"
                />
            </form>
    );
}
