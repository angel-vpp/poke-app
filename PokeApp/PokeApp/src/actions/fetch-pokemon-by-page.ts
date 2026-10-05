import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonByPageAction } from "./get-pokemon-by-page.action";
import { getPokemonAction } from "./get-pokemon.action";
import type { RootState } from "@/store/store";

interface FetchPokemonParams {
    limit: number,
    offset: number,
}

export const fetchPokemonByPage = createAsyncThunk(
    'pokemon/fetchPokemonByPage',
    async ({ limit, offset }: FetchPokemonParams, { getState }) => {

        const state = getState() as RootState
        const existingPokemon = new Set(state.pokemon.data.map(p => p.id))

        const response = await getPokemonByPageAction(limit, offset)
        const newPokemon = response.map((p: { name: string, url: string }) => {
            const id = Number(p.url.split('/').filter(Boolean).pop())
            return { name: p.name, id }
        }).filter(p => !existingPokemon.has(p.id))

        const pokemonPromises = newPokemon.map(p => getPokemonAction(p.name))

        const PokemonList = await Promise.all(pokemonPromises)

        return PokemonList
    }
)