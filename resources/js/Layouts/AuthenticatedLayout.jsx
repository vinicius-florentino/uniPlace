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
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import HomeIcon from "@mui/icons-material/Home";
// import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";

export default function Authenticated({ user, children }) {
    const { post } = useForm({});

    // const pageIconFontSize = "small";

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        border: "var(--borders)",
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        width: "100%",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "30ch",
                },
            },
        },
    }));

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

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);

    const handleOpenMenuDrawer = () => {
        setOpenMenuDrawer(true);
    };

    const handleCloseMenuDrawer = () => {
        setOpenMenuDrawer(false);
    };

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        post(route("logout"), {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
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
                                onClick={handleOpenMenuDrawer}
                                color="inherit"
                            >
                                <MenuIcon sx={{ color: "var(--dark-color)" }} />
                            </IconButton>
                            <Drawer
                                anchor={"left"}
                                open={openMenuDrawer}
                                onClose={handleCloseMenuDrawer}
                            >
                                <Box
                                    sx={{ width: 250 }}
                                    role="presentation"
                                    // onClick={toggleDrawer(anchor, false)}
                                    // onKeyDown={toggleDrawer(anchor, false)}
                                >
                                    <List>
                                        {pages.map((page, index) => (
                                            <ListItem
                                                key={index}
                                                disablePadding
                                            >
                                                <ListItemButton
                                                    href={page.href}
                                                >
                                                    <ListItemText
                                                        primary={page.label}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </Box>
                        {/* <Typography
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
                        </Typography> */}

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
                        <Box
                            sx={{
                                mr: { sm: 5 },
                                color: "var(--dark-color)",
                            }}
                        >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Pesquise"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
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
                                    <Tooltip title="Menu pessoal">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            {/* <Avatar
                                                alt={user?.name.toUpperCase()}
                                                src="/static/images/avatar/2.jpg"
                                            /> */}
                                            <AccountCircleIcon
                                                color="var(--dark-color)"
                                                fontSize="large"
                                            />
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
