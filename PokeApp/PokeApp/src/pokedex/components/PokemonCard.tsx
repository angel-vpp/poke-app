import { Box, Card, IconButton, Typography } from "@mui/material";
import type { Pokemon } from "../types/pokemon.interface";
import { TypeBadge } from "./TypeBadge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { FavoritePokemonContext } from "@/context/FavoritePokemonContext";
import { use } from "react";
import React from "react";

interface Props {
    pokemon: Pokemon;
    onClick: () => void
}

export const PokemonCard = React.memo(({ pokemon, onClick }: Props) => {

    const { toggleFavorite, isFavorite } = use(FavoritePokemonContext)

    return (
        <Card
            onClick={onClick}
            sx={(theme) => ({
                width: "100%",
                textAlign: "left",
                borderRadius: 5,
                padding: theme.spacing(2),
                position: "relative",
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                cursor: "pointer",

                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",

                "&:hover": {
                    border: "1px solid rgb(223, 67, 67)",
                    transform: "translateY(-6px)",
                    transition: "transform 0.75s",
                    boxShadow: "0px 0px 24px 5px rgba(0,0,0,0.15)",
                },

                "&:hover .pokemon-sprite": {
                    animation: "bounceSoft 1.3s ease-in-out infinite",
                    transition: "scale 0.3s",
                    scale: 1.2,
                },

                "&:active": {
                    transform: "translateY(-2px)",
                },

                "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                },

                "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    border: "36px solid rgba(0,0,0,0.04)",
                    top: -200,
                    left: -30,
                    pointerEvents: "none",
                },
            })}
        >
            <Box sx={{ justifyContent: "space-between", mb: 1 }}>
                <Typography
                    sx={{
                        position: "absolute",
                        top: 13,
                        left: 13,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "hsl(var(--muted-foreground))",
                    }}
                >
                    #{String(pokemon.id).padStart(3, "0")}
                </Typography>
            </Box>

            <Box>
                <IconButton size="small" sx={{
                    position: 'absolute',
                    top: 7,
                    right: 7,
                    color: "hsl(var(--destructive))"
                }}
                    onClick={(event) => {
                        event.stopPropagation()
                        toggleFavorite(pokemon)
                    }}
                >

                    {isFavorite(pokemon) ? (
                        <FavoriteIcon fontSize="small" />
                    ) : (
                        <FavoriteBorderIcon fontSize="small" />
                    )}
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 1,
                    position: "relative",
                    alignItems: "center",
                    mt: 2,
                    zIndex: 10,
                }}
            >
                <Box
                    component="img"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    loading="lazy"
                    sx={{
                        width: 100,
                        height: 100,
                        maxWidth: 128,
                        minWidth: 64,
                        imageRendering: "pixelated",
                    }}
                    className="pokemon-sprite"
                />
            </Box>

            <Typography
                sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    textAlign: "center",
                    color: "hsl(var(--foreground))",
                    mt: -1.5,
                    mb: 1.5,
                    position: "relative",
                    zIndex: 10,
                }}
            >
                {pokemon.name}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1.5,
                    position: "relative",
                    zIndex: 10,
                }}
            >
                {pokemon.types.map((t) => (
                    <TypeBadge key={t.type.name} type={t} />
                ))}
            </Box>
        </Card>
    );
})
