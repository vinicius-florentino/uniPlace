import React from "react";

import Header from "./Components/Header";
import Container from "@mui/material/Container";

export default function NavigationLayout({
    user,
    children,
    disableContainer,
    disablePadding,
}) {
    return (
        <>
            <header>
                <Header user={user} />
            </header>

            <main style={{ padding: disablePadding ? "0px" : "16px 0px" }}>
                {disableContainer && <>{children}</>}
                {!disableContainer && (
                    <Container maxWidth={"lg"}>{children}</Container>
                )}
            </main>

            <footer></footer>
        </>
    );
}