import { createReducer } from '@reduxjs/toolkit'
import { fetchPokemonByPage } from "@/actions/fetch-pokemon-by-page"
import type { PokemonState } from '@/pokedex/types/pokemon.state.interface'

const initialState: PokemonState = {
    limit: 50, offset: 0, data: [], error: null, loading: false,
}

export const usePaginatedPokemon = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchPokemonByPage.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchPokemonByPage.fulfilled, (state, action) => {
            state.loading = false
            const newPokemon = action.payload.filter(
                (p) => !state.data.some(existing => existing.id === p.id)
            )

            state.data.push(...newPokemon)
        })
        .addCase(fetchPokemonByPage.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Error en el fetch de los pokemon'
        })
})