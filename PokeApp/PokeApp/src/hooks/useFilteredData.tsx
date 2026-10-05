import { FavoritePokemonContext } from "@/context/FavoritePokemonContext"
import { useAppSelector } from "@/store/hooks"
import { useMemo, use } from "react"
import { useSearchParams } from "react-router"

export const useFilteredData = () => {

    const { data } = useAppSelector((state) => state.pokemon)
    const [searchParams] = useSearchParams()
    const { Favorites } = use(FavoritePokemonContext)

    const filteredData = useMemo(() => {
        const search = searchParams.get('search')?.toLowerCase() ?? ''

        return data.filter((pokemon) => {
            let matchesSearch = true
            let matchesFav = true

            if (search !== '') {
                matchesSearch = pokemon.name.toLowerCase().includes(search) ||
                    String(pokemon.id).includes(search) ||
                    pokemon.types.some((t) => t.type.name.toLowerCase().includes(search))
            }
            if (searchParams.get('favorites') === 'true') {
                matchesFav = Favorites.some(f => f.id === pokemon.id)
            }

            return matchesFav && matchesSearch
        })
    }, [data, searchParams, Favorites])

    return filteredData
}