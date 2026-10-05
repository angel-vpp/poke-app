import { pokemonApi } from "@/pokedex/api/pokemon.api"
import type { Pokemon } from "@/pokedex/types/pokemon.interface"

export const getPokemonAction = async (
    name: string,
): Promise<Pokemon> => {
    const { data } = await pokemonApi.get<Pokemon>(`/${name}`)

    return data
}