import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import HomeIcon from "@mui/icons-material/Home";
// import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Authenticated({ user, children }) {
    const { post } = useForm({});

    // const pageIconFontSize = "small";

    const pages = [
        {
            label: "Início",
            href: "/",
        },
        {
            label: "Planos",
            href: "/plans",
        },
        {
            label: "Ajuda",
            href: "#",
        },
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        post(route("logout"));
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href={route("dashboard")}
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontWeight: 700,
                                fontFamily: "monospace",
                                fontSize: 20,
                                letterSpacing: "0",
                                color: "var(--primary-color)",
                                textDecoration: "none",
                            }}
                        >
                            UNIPLACE
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon sx={{color: "var(--dark-color)"}}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "0",
                                color: "var(--primary-color)",
                                textDecoration: "none",
                            }}
                        >
                            UNIPLACE
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map((page, index) => (
                                <Button
                                    key={index}
                                    href={page.href}
                                    sx={{
                                        my: 2,
                                        color: "var(--dark-color)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "5px",
                                    }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {!user && (
                                <Button
                                    href="/login"
                                    disableElevation
                                    fullWidth
                                    variant="containedLight"
                                    sx={{
                                        my: 2,
                                    }}
                                >
                                    Entrar
                                </Button>
                            )}
                            {user && (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            {/* <Avatar
                                                alt={user?.name.toUpperCase()}
                                                src="/static/images/avatar/2.jpg"
                                            /> */}
                                            <AccountCircleIcon color="var(--dark-color)" fontSize="large"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem
                                            component="a"
                                            onClick={handleCloseUserMenu}
                                            href={route("profile.edit")}
                                        >
                                            Perfil
                                        </MenuItem>

                                        <MenuItem onClick={handleLogout}>
                                            Sair
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <main>
                <Container maxWidth="xl">{children}</Container>
            </main>
        </>
    );
}
