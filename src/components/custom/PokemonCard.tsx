import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../shadcn/card.tsx"
import {Button} from "@/components/shadcn/button.tsx";

type PokemonCardProps = {
    id: number
    name: string
    type: string
    imageUrl: string
    handleDelete: (id: number) => void
}


export function PokemonCard({id, name, type, imageUrl, handleDelete }: PokemonCardProps) {
    return (
        <Card className="w-44">
            <CardHeader>
                <CardTitle className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    <div className="flex items-center justify-center">
                        <div className="flex-1  ">
                            {type}
                        </div>
                        <div className="flex-1 ">
                            <Button className="cursor-pointer" onClick={() => handleDelete(id)}>
                                Delete
                            </Button>
                        </div>
                    </div>

                </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-24 h-24 object-contain"
                />
            </CardContent>

            <CardFooter className="justify-center">
                <CardDescription className="text-gray-800 font-bold capitalize">
                    {name}
                </CardDescription>
            </CardFooter>
        </Card>
    )
}
