import { pokemonApi } from "@/pokedex/api/pokemon.api"
import type { PokemonResponse, Result } from "@/pokedex/types/get-pokemon.response"

export const getPokemonByPageAction = async (
    limit: number,
    offset: number,
): Promise<Result[]> => {
    if (isNaN(limit)) limit = 50
    const { data } = await pokemonApi.get<PokemonResponse>('/', {
        params: {
            limit: limit,
            offset: offset,
        }
    })

    return data.results
}