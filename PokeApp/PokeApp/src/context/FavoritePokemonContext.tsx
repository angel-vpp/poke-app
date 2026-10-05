import type { Pokemon } from "@/pokedex/types/pokemon.interface";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

interface FavoritePokemonContext {
    //State
    Favorites: Pokemon[];

    //Methods
    toggleFavorite: (pokemon: Pokemon) => void;
    isFavorite: (pokemon: Pokemon) => boolean;
}

export const FavoritePokemonContext = createContext({} as FavoritePokemonContext)


const getFavoritesFromLocalStorage = (): Pokemon[] => {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
}

export const FavoritePokemonProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Pokemon[]>(getFavoritesFromLocalStorage())

    const toggleFavorite = (pokemon: Pokemon) => {
        const pokemonExist = favorites.find(p => p.id === pokemon.id)
        if (pokemonExist) {
            setFavorites(favorites.filter(p => p.id !== pokemon.id))
            return
        }
        setFavorites([...favorites, pokemon])
    }

    const isFavorite = (pokemon: Pokemon) => {
        return favorites.some(p => p.id === pokemon.id)
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    return (
        <FavoritePokemonContext
            value={{
                //State
                Favorites: favorites,

                //Methods
                toggleFavorite: toggleFavorite,
                isFavorite: isFavorite,
            }}
        >
            {children}
        </FavoritePokemonContext>
    )
}
