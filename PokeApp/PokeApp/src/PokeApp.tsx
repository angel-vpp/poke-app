import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { FavoritePokemonProvider } from "./context/FavoritePokemonContext";

export const PokeApp = () => {
    return (
        <Provider store={store}>
            <FavoritePokemonProvider>
                <RouterProvider router={appRouter} />
                <CssBaseline enableColorScheme />
            </FavoritePokemonProvider>
        </Provider>
    )
}
