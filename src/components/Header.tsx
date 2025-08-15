import {Input} from "@/components/ui/input.tsx";
import {SortPopover} from "@/components/ui/sortPopover.tsx";

export function Header() {
    return (
        <div className="flex w-full bg-red-500 p-6">
            <div className="flex flex-1 items-center mb-4">
                <img
                    src="src/assets/pokeball_icon_136305.svg"
                    alt="Logo"
                    className="w-10 h-10 mr-3"
                />
                <h2 className="text-white text-3xl font-bold">Pokédex</h2>
            </div>

            <div className="flex flex-1 items-center space-x-3">
                <Input
                    placeholder="Search Pokémon"
                    className="w-full rounded-full border border-white bg-white px-4 py-2 text-black-200 placeholder-gray-300"

                />

                <SortPopover />

            </div>
        </div>
    );
}
