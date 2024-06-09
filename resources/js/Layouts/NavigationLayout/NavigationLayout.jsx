import React from "react";

import Header from "./Components/Header";
import { Box, Container } from "@mui/material";

export default function NavigationLayout({
    user,
    children,
    disableContainer,
    disablePadding,
}) {
    return (
        <>
            <header style={{ padding: disablePadding ? "0px" : "16px 0px" }}>
                <Header user={user} />
            </header>

            <Box
                component="main"
                sx={{
                    padding: disablePadding ? "0px" : "16px 0px",
                    height: {
                        xs: "calc(99vh - 51px)",
                        sm: "calc(99vh - 60px)",
                        md: "calc(99vh - 72px)",
                    },
                    width: "100vw"
                }}
            >
                {disableContainer && <>{children}</>}
                {!disableContainer && (
                    <Container maxWidth={"lg"}>{children}</Container>
                )}
            </Box>
        </>
    );
}
