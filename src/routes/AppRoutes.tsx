import {Routes, Route} from "react-router-dom";
import {HomePage} from "@/pages/HomePage.tsx";
import {PokemonDetailsPage} from "@/pages/PokemonDetailsPage.tsx";

export function AppRoutes(){
    return (
        <Routes>
           <Route path="/" element={<HomePage />} />
              <Route path="/pokemons/:id" element={<PokemonDetailsPage />} />
        </Routes>
    )
}