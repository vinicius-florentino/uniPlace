import React from "react";

import Header from "./Components/Header";
import Container from "@mui/material/Container";

export default function NavigationLayout({ user, children }) {
    return (
        <>
            <header>
                <Header user={user} />
            </header>

            <main style={{ padding: "16px 0px" }}>
                <Container maxWidth="lg">{children}</Container>
            </main>

            <footer>
                
            </footer>
        </>
    );
}
