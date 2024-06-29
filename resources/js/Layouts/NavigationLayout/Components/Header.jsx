import React from "react";

import Logo from "@/Components/Logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PersonalMenu from "./PersonalMenu";
import NavigationMenu from "./NavigationMenu";
import Link from "@mui/material/Link";
import { router } from "@inertiajs/react";

export default function Header({ user }) {
    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box component={Link} onClick={() => router.visit("/")}>
                            <Logo />
                        </Box>

                        <NavigationMenu />

                        <Box sx={{ flexGrow: 0 }}>
                            {!user ? (
                                <Button
                                    onClick={() => router.visit("/login")}
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
