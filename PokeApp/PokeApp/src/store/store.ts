import { usePaginatedPokemon } from "@/hooks/usePaginatedPokemon";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        pokemon: usePaginatedPokemon
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;