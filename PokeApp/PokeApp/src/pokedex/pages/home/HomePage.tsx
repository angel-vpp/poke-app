import { MainBox } from '@/pokedex/components/MainBox';
import { PokeAppHeader } from '@/pokedex/components/PokeAppHeader';
import { Box } from "@mui/material";


export const HomePage = () => {

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "hsl(var(--background))" }}>
            <PokeAppHeader />
            <MainBox />
        </Box>
    )
}
