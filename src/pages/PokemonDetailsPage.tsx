import {useGetPokemonsByItsId} from "@/hooks/useGetPokemonsByitsId.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@/components/shadcn/button.tsx";


export function PokemonDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { isPending, data } = useGetPokemonsByItsId(Number(id));
    const navigate = useNavigate();

    if (isPending) return <p className="text-center">Loading...</p>;
    if (!data) return <p className="text-center">Pokémon not found</p>;

    return (
        <div className="flex flex-col items-center p-6">
            <Button onClick={() => navigate(`/`)}> back</Button>
            <h1 className="text-3xl font-bold mb-4 capitalize">{data.name}</h1>
            <img
                src={data.imageUrl}
                alt={data.name}
                className="w-48 h-48 mb-6"
            />
            <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md">
                <p><span className="font-bold">ID:</span> {data.id}</p>
                <p><span className="font-bold">Name:</span> {data.name}</p>
                <p><span className="font-bold">Type:</span> {data.type}</p>
                <p><span className="font-bold">Height:</span> {data.height}</p>
                <p><span className="font-bold">Weight:</span> {data.weight}</p>
            </div>
        </div>
    );
}