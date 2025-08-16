
export function Header() {
    return (
        <div className="flex w-full bg-red-500 p-6">
            <div className="flex flex-1 items-center mb-4">
                <img
                    src="../../assets/pokeball_icon_136305.svg"
                    alt="Logo"
                    className="w-10 h-10 mr-3"
                />
                <h2 className="text-white text-3xl font-bold">Pokédex</h2>
            </div>

        </div>
    );
}
