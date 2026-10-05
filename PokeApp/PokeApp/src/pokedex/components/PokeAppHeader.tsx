import CatchingPokemon from "@mui/icons-material/CatchingPokemon"
import { AppBar, Toolbar, Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "lucide-react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useRef, useState } from "react";
import { useSearchParams } from "react-router";

export const PokeAppHeader = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const inputRef = useRef<HTMLInputElement>(null)

    const [showFavorites, setShowFavorites] = useState(searchParams.get('favorites') === 'true')

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value = inputRef.current?.value ?? ''
            setQueryParams('search', value)
        }
    }

    const handleToggleShowFavorites = () => {
        setShowFavorites((prev) => !prev)

        setQueryParams('favorites', (!showFavorites).toString())
    }

    const setQueryParams = (name: string, value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set(name, value)
            return newParams
        })
    }

    return (
        <AppBar sx={{ position: "sticky", top: 0, zIndex: 30, background: "hsl(var(--foreground))" }} className="header-glass">
            <Toolbar sx={{ width: "100%", px: 4, py: 2 }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 4, width: "100%" }}>
                    {/* Título y Logo */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <CatchingPokemon sx={{ fontSize: 28, color: "hsl(var(--pokedex-red))" }} />
                            <Box>
                                <Typography sx={{ fontFamily: "var(--font-pixel)", fontSize: "1.5rem", color: "hsl(var(--primary))", letterSpacing: "0.05em" }}>
                                    POKÉAPP
                                </Typography>
                                <Typography sx={{ fontSize: "12.5px", color: "hsl(220,10%,85%)", fontFamily: "monospace", mt: 0.5 }}>
                                    Pokemon Registrados:
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3, width: { xs: "100%", sm: "auto" } }}>

                        {/* Favoritos */}
                        <IconButton
                            onClick={handleToggleShowFavorites}
                            sx={{ color: "hsl(var(--destructive))" }}
                        >
                            {showFavorites ? (
                                <FavoriteIcon />
                            ) : (
                                <FavoriteBorderIcon />
                            )}

                        </IconButton>

                        {/* Búsqueda */}
                        <Box sx={{ position: "relative", flex: 1, width: { sm: 288 } }}>
                            <TextField
                                fullWidth
                                placeholder="Busca por nombre, número o tipo..."
                                variant="outlined"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search style={{ width: 16, height: 16, color: "hsl(var(--muted-foreground))" }} />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: 40,
                                        background: "hsl(var(--secondary))",
                                        borderRadius: "12px",
                                        fontSize: "0.875rem",
                                        color: "hsl(var(--foreground))",
                                        "& fieldset": { borderColor: "hsl(var(--border))" },
                                        "&:hover fieldset": { borderColor: "hsl(var(--border))" },
                                        "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary) / 0.5)" }
                                    },
                                    "& input::placeholder": { color: "hsl(var(--muted-foreground))", opacity: 1 }
                                }}
                                inputRef={inputRef}
                                onKeyDown={handleKeyDown}
                                defaultValue={searchParams.get('search') ?? ''}
                            />
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
