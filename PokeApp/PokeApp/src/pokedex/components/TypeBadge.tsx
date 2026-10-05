import type { Type } from "../types/pokemon.interface";
import { Box } from "@mui/material";

interface Props {
    type: Type;
}

export const TypeBadge = ({ type }: Props) => {

    return (
        <Box
            sx={{
                display: "inline-block",
                borderRadius: "9999px",
                bgcolor: `hsl(var(--type-${type.type.name}))`,
                color: "hsl(var(--primary-foreground))",
                fontWeight: 600,
                textTransform: "capitalize",
                px: 1.5,
                py: 0.5,
                fontSize: "10px",
            }}
        >
            {type.type.name}
        </Box>
    );
};