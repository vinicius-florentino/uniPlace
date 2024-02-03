import React from "react";

import Header from "./Components/Header";
import Container from "@mui/material/Container";

export default function NavigationLayout({ user, children }) {

    return (
        <>
            <header>
                <Header user={user}/>
            </header>

            <main>
                <Container maxWidth="xl">{children}</Container>
            </main>

            <footer>
                
            </footer>
        </>
    );
}
