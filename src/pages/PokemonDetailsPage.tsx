import {useGetPokemonsByItsId} from "@/hooks/useGetPokemonsByitsId.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@/components/shadcn/button.tsx";

// Type colors mapping
const typeColors: { [key: string]: string } = {
    grass: "bg-green-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    psychic: "bg-purple-500",
    ice: "bg-cyan-400",
    dragon: "bg-indigo-600",
    dark: "bg-gray-700",
    fairy: "bg-pink-400",
    poison: "bg-purple-600",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    bug: "bg-green-600",
    rock: "bg-yellow-700",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
    fighting: "bg-red-600",
    normal: "bg-gray-400"
};

export function PokemonDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { isPending, data } = useGetPokemonsByItsId(id);
    const navigate = useNavigate();

    if (isPending) return <p className="text-center">Loading...</p>;
    if (!data) return <p className="text-center">Pokémon not found</p>;

    const typeColor = typeColors[data.type.toLowerCase()] || typeColors.normal;

    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20"></div>

            {/* Back button */}
            <div className="absolute top-6 left-6 z-10">
                <Button
                    onClick={() => navigate(`/`)}
                    variant="ghost"
                    className="bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white rounded-full p-3"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Button>
            </div>

            <div className="flex items-center justify-center min-h-screen p-6">
                <div className="relative">
                    {/* Main Pokemon Card */}
                    <div className={`${typeColor} rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden max-w-lg w-full`}>
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                        {/* Pokemon name and arrow */}
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <h1 className="text-3xl font-bold capitalize tracking-wider">{data.name}</h1>
                            <svg className="w-6 h-6 rotate-45" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        {/* Pokemon ID */}
                        <div className="mb-10 relative z-10">
                            <span className="text-white/80 text-lg tracking-wide">#{String(data.id).padStart(3, "0")}</span>
                        </div>

                        {/* Pokemon Image */}
                        <div className="flex justify-center mb-8 relative z-10">
                            <div className="relative">
                                <div className="w-48 h-48 flex items-center justify-center">
                                    <img
                                        src={data.imageUrl}
                                        alt={data.name}
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* About section */}
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-6 tracking-wide">About</h3>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-base font-medium tracking-wide">{data.weight}</span>
                                        <span className="text-sm text-white/70 tracking-wider">Weight</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-base font-medium tracking-wide">{data.height}</span>
                                        <span className="text-sm text-white/70 tracking-wider">Height</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-5 h-5 rounded-full mb-2 bg-white/30`}></div>
                                        <span className="text-base font-medium capitalize tracking-wide">{data.type}</span>
                                        <span className="text-sm text-white/70 tracking-wider">Type</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}