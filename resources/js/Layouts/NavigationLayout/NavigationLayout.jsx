import React from "react";

import Header from "./Components/Header";
import Container from "@mui/material/Container";

export default function NavigationLayout({ user, children, disableContainer }) {
    return (
        <>
            <header>
                <Header user={user} />
            </header>

            <main style={{ padding: "16px 0px" }}>
                <Container maxWidth={disableContainer ? "" : "lg"}>{children}</Container>
            </main>

            <footer>
                
            </footer>
        </>
    );
}
