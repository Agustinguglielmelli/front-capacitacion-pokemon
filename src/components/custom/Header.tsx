export function Header() {
    return (
        <div className="w-full bg-red-500 px-6 py-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-4">
                    <img
                        src="src/assets/pokeball_icon_136305.svg"
                        alt="Logo"
                        className="w-8 h-8 mr-3 filter brightness-0 invert"
                    />
                    <h1 className="text-white text-2xl font-bold">
                        Pokédex
                    </h1>
                </div>
            </div>
        </div>
    );
}