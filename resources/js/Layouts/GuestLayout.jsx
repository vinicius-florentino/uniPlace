import React from "react";
import Box from "@mui/system/Box";
import Logo from "@/Components/Logo";
import { router } from "@inertiajs/react";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

export default function Guest({ children }) {
    return (
        <Container maxWidth="xs" disableGutters>
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        p: 4,
                        boxShadow: "var(--box-shadow)",
                        backgroundColor: "var(--white-color)",
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="8px"
                >
                    <Box component={Link} onClick={() => router.visit("/")}>
                        <Logo height="48px" width="48px" />
                    </Box>

                    <Box>{children}</Box>
                </Box>
            </Box>
        </Container>
    );
}
