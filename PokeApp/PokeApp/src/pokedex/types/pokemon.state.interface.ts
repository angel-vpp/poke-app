import type { Pokemon } from "./pokemon.interface";

export interface PokemonState {
    limit: number,
    offset: number,
    loading: boolean,
    error: string | null,
    data: Pokemon[],
}