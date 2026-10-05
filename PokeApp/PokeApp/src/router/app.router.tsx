import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";
import { HomePage } from "@/pokedex/pages/home/HomePage";
import { PokemonPage } from "@/pokedex/pages/pokemon/PokemonPage";


//const PokemonPage = lazy(() => import("@/heroes/pages/search/SearchPage"))

//const FavoritesPage = lazy(() => import("@/admin/pages/AdminPage"))

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: 'pokemon/:idSlug',
        element: <PokemonPage />,
    },
    {
        path: '*',
        element: <Navigate to='/' />
    },
])