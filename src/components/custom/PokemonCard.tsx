import { Button } from "../shadcn/button";
import { Card } from "@/components/shadcn/card.tsx";
import type { Pokemon } from "@/types/Pokemon.ts";

type PokemonCardProps = {
    id: number
    name: string
    type: string
    imageUrl: string
    height: number
    weight: number
    handleDelete: (id: number) => void
    handleEdit: (pokemon: Pokemon) => void
}

export function PokemonCard({ id, name, type, imageUrl, height, weight, handleDelete, handleEdit }: PokemonCardProps) {
    return (
        <Card className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative">
            {/* Header con número y botones */}
            <div className="relative text-right p-2">
                <span className="text-gray-400 text-sm font-mono">
                    #{id.toString().padStart(3, '0')}
                </span>

                {/* Botones de acción - aparecen en hover en el header */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                    <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-6 px-2 bg-white hover:bg-gray-100 shadow-sm"
                        onClick={() => handleEdit({id, name, type, imageUrl, height, weight})}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs h-6 px-2 shadow-sm"
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {/* Imagen del Pokémon */}
            <div className="flex justify-center px-4 -mt-2">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-20 h-20 object-contain"
                />
            </div>

            {/* Nombre del Pokémon */}
            <div className="p-4 pt-2 text-center">
                <h3 className="text-gray-800 font-semibold text-sm capitalize mb-2">
                    {name}
                </h3>
            </div>
        </Card>
    )
}