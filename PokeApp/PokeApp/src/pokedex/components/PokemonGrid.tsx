import { Box, Button, Grid } from "@mui/material"
import { DetailedPokemonCard } from "./DetailedPokemonCard"
import { PokemonCard } from "./PokemonCard"
import { fetchPokemonByPage } from "@/actions/fetch-pokemon-by-page"
import { use, useMemo, useState } from "react"
import type { Pokemon } from "../types/pokemon.interface"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useFilteredData } from "@/hooks/useFilteredData"
import { FavoritePokemonContext } from "@/context/FavoritePokemonContext"
import { useSearchParams } from "react-router"

export const PokemonGrid = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

    const { data, limit, loading } = useAppSelector((state) => state.pokemon)

    const filteredData = useFilteredData()

    const dispatch = useAppDispatch()

    const handleOpen = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon)
    }

    const handleClose = () => {
        setSelectedPokemon(null)
    }

    const handleLoadMore = () => {
        if (loading) return

        dispatch(fetchPokemonByPage({ offset: data.length, limit }))
    }

    const [searchParams] = useSearchParams()
    const { Favorites } = use(FavoritePokemonContext)

    const showFavorites = searchParams.get('favorites') === 'true'

    const loadedIds = useMemo(
        () => new Set(data.map(p => p.id)),
        [data]
    )

    const allFavsLoaded = useMemo(() => {
        if (!showFavorites) return false

        return Favorites.every(fav => loadedIds.has(fav.id))
    }, [Favorites, loadedIds, showFavorites])

    return (
        <Box>
            <Grid container spacing={3} justifyContent={'center'}>
                {filteredData.map((pokemon) => (
                    <Grid size={{ xs: 5, sm: 4, md: 3, lg: 2 }} key={pokemon.id}
                        sx={{ scrollMarginTop: "120px" }}
                    >
                        <PokemonCard pokemon={pokemon} onClick={() => handleOpen(pokemon)} />
                    </Grid>
                ))}
            </Grid>
            <DetailedPokemonCard pokemon={selectedPokemon} open={!!selectedPokemon} onClose={handleClose} />
            {!loading && !allFavsLoaded &&
                (<Box
                    display={'flex'}
                    py={3}
                    justifyContent={'center'}
                >
                    <Button
                        variant='outlined'
                        sx={{
                            px: 3.5,
                            py: 1.1,
                            borderRadius: 4,
                            fontWeight: 600,
                            borderWidth: "2px",
                            color: "var(--color-backgorund)",
                            bgcolor: "var(--color-muted)",
                            borderColor: "var(--color-muted-foreground)",
                        }}
                        onClick={handleLoadMore}
                    >
                        Cargar más
                    </Button>
                </Box>)}
        </ Box>
    )
}



