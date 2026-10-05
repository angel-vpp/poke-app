import CatchingPokemon from "@mui/icons-material/CatchingPokemon"
import { Box, Typography } from "@mui/material"
import { PokemonGrid } from "./PokemonGrid"
import { fetchPokemonByPage } from "@/actions/fetch-pokemon-by-page"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useFilteredData } from "@/hooks/useFilteredData"

export const MainBox = () => {
    const dispatch = useAppDispatch()

    const { data, limit, loading } = useAppSelector((state) => state.pokemon)

    const filteredData = useFilteredData()

    useEffect(() => {
        if (data.length === 0 && !loading) {
            dispatch(fetchPokemonByPage({ offset: 0, limit }));
        }
    }, [dispatch, data.length, loading]);

    return (
        <Box sx={{ width: '100%', px: 4, py: 8 }}>
            {filteredData.length !== 0 ? (
                <PokemonGrid />
            ) : (
                !loading && (<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 32, gap: 3 }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, background: "hsl(0,0%,94%)" }}>
                        <Typography sx={{ fontSize: "1.5rem" }}>🔍</Typography>
                    </Box>
                    <Typography sx={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>No existe ningún pokémon con este filtro</Typography>
                </Box>)
            )}

            {loading && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 5, gap: 4 }}>
                    <Box sx={{ position: "relative" }}>
                        <CatchingPokemon sx={{ fontSize: 40, color: "hsl(var(--primary))", animation: "spin 1s linear infinite" }} />
                    </Box>
                    <Typography sx={{ fontFamily: "var(--font-pixel)", fontSize: "10px", letterSpacing: "0.05em" }}>
                        Cargando Pokémon...
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
