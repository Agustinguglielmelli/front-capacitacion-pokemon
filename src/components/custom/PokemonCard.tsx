import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../shadcn/card.tsx"

type PokemonCardProps = {
    name: string
    type: string
    imageUrl: string
}

export function PokemonCard({ name, type, imageUrl }: PokemonCardProps) {
    return (
        <Card className="w-44">
            <CardHeader>
                <CardTitle className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {type}
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
