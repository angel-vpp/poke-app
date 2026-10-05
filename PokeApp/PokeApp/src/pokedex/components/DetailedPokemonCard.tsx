import type { Pokemon } from "../types/pokemon.interface"
import {
    Dialog,
    Box,
    Stack,
    Typography,
    IconButton,
    Grid,
    Chip,
    Divider,
    LinearProgress,
    Slide,
    useTheme,
} from "@mui/material"
import type { TransitionProps } from "@mui/material/transitions"
import { forwardRef, use } from "react"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CloseIcon from "@mui/icons-material/Close"
import { TypeBadge } from "./TypeBadge"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { FavoritePokemonContext } from "@/context/FavoritePokemonContext"

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

interface DetailedPokemonCardProps {
    pokemon: Pokemon | null
    open: boolean
    onClose: () => void
}

export const DetailedPokemonCard = ({ pokemon, open, onClose, }: DetailedPokemonCardProps) => {
    const theme = useTheme()

    if (!pokemon) return null

    const { toggleFavorite, isFavorite } = use(FavoritePokemonContext)

    const total = pokemon.stats.reduce((s, st) => s + st.base_stat, 0)

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    maxHeight: "90vh",
                },
            }}
        >
            <Box position="relative">
                {/* Header */}
                <Box
                    sx={{
                        px: 3,
                        pt: 3,
                        pb: 10,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        position: "relative",
                        overflow: "visible",
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography
                                fontFamily="monospace"
                                fontWeight="bold"
                                fontSize={14}
                            >
                                #{String(pokemon.id).padStart(3, "0")}
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                textTransform="capitalize"
                            >
                                {pokemon.name}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{ color: "hsl(var(--destructive))" }}
                                onClick={() => toggleFavorite(pokemon)}
                            >
                                {isFavorite(pokemon) ? (
                                    <FavoriteIcon fontSize="small" />
                                ) : (
                                    <FavoriteBorderIcon fontSize="small" />
                                )}
                            </IconButton>
                            <IconButton onClick={onClose} size="small">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        {pokemon.types.map((t) => (
                            <TypeBadge key={t.type.name} type={t} />
                        ))}
                    </Stack>

                    <Box
                        component="img"
                        src={pokemon.sprites.other?.["official-artwork"].front_default}
                        alt={pokemon.name}
                        sx={{
                            width: 140,
                            height: 140,
                            position: "absolute",
                            right: 24,
                            bottom: -56,
                            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))",
                            zIndex: 9999,
                            marginBottom: 4,
                        }}
                    />
                </Box>

                <Box px={3} py={3}>
                    {/* Info Cards */}
                    <Grid container spacing={2} mb={4}>
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    backgroundColor: theme.palette.background.default,
                                }}
                            >
                                <Typography fontFamily="monospace" fontWeight="bold">
                                    {(pokemon.height / 10).toFixed(1)}m
                                </Typography>
                                <Typography variant="caption">Height</Typography>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    backgroundColor: theme.palette.background.default,
                                }}
                            >
                                <Typography fontFamily="monospace" fontWeight="bold">
                                    {(pokemon.weight / 10).toFixed(1)}kg
                                </Typography>
                                <Typography variant="caption">Weight</Typography>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    backgroundColor: theme.palette.background.default,
                                }}
                            >
                                <Typography
                                    fontWeight="bold"
                                    textTransform="capitalize"
                                    noWrap
                                >
                                    {pokemon.abilities[0].ability?.name}
                                </Typography>
                                <Typography variant="caption">Ability</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Ability Extra */}
                    {pokemon.abilities.length > 1 && (
                        <Box mb={4}>
                            <Typography
                                variant="overline"
                                color="primary"
                                sx={{ letterSpacing: 2 }}
                            >
                                Abilities
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                                {pokemon.abilities.map((a) => (
                                    <Chip
                                        key={a.ability?.name}
                                        label={a.ability?.name}
                                        size="small"
                                        sx={{ textTransform: "capitalize" }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {/* Base Stats */}
                    <Typography
                        variant="overline"
                        color="primary"
                        sx={{ letterSpacing: 2 }}
                    >
                        Base Stats
                    </Typography>

                    <Stack spacing={2} mt={2}>
                        {pokemon.stats.map((stat) => {
                            const max = 200
                            const pct = Math.min((stat.base_stat / max) * 100, 100)

                            return (
                                <Stack
                                    key={stat.stat.name}
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Typography
                                        fontFamily="monospace"
                                        fontSize={12}
                                        width={50}
                                        textAlign="right"
                                    >
                                        {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
                                    </Typography>

                                    <Typography fontFamily="monospace" width={30}>
                                        {stat.base_stat}
                                    </Typography>

                                    <LinearProgress
                                        variant="determinate"
                                        value={pct}
                                        sx={{
                                            flex: 1,
                                            height: 8,
                                            borderRadius: 5,
                                        }}
                                    />
                                </Stack>
                            )
                        })}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            fontFamily="monospace"
                            fontSize={12}
                            color="primary"
                            width={50}
                            textAlign="right"
                        >
                            TOTAL
                        </Typography>

                        <Typography fontFamily="monospace" fontWeight="bold">
                            {total}
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    )
}