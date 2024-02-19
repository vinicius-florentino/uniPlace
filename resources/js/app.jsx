import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

import muiTheme from "../css/theme/muiTheme";
import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";

import "./bootstrap";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const theme = createTheme(muiTheme);

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={theme}>
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar
                />
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: "var(--secondary-color)",
    },
});
