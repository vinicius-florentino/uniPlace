import React from "react";

import Logo from "@/Components/Logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PersonalMenu from "./PersonalMenu";
import NavigationMenu from "./NavigationMenu";

export default function Footer({ user }) {
    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box component="a" href="/">
                            <Logo />
                        </Box>

                        <NavigationMenu />

                        <Box sx={{ flexGrow: 0 }}>
                            {!user ? (
                                <Button
                                    href="/login"
                                    disableElevation
                                    fullWidth
                                    variant="containedLight"
                                >
                                    Entrar
                                </Button>
                            ) : (
                                <PersonalMenu user={user} />
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
