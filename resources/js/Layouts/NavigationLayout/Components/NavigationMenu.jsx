import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { router } from "@inertiajs/react";
import RemixIcon from "@/Components/RemixIcon";

export default function NavigationMenu({}) {
    const pages = [
        {
            label: "Início",
            href: "/",
            disabled: false
            // startIcon: <RemixIcon className="ri-home-4-line"/>,
        },
        {
            label: "Planos",
            href: "/plans",
            disabled: false
            // startIcon: <RemixIcon className="ri-briefcase-line"/>,
        },
        {
            label: "Ajuda",
            href: "#",
            disabled: true
            // startIcon: <RemixIcon className="ri-question-line"/>,
        },
    ];

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);

    const handleOpenMenuDrawer = () => {
        setOpenMenuDrawer(true);
    };

    const handleCloseMenuDrawer = () => {
        setOpenMenuDrawer(false);
    };

    return (
        <>
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
                    <RemixIcon className="ri-menu-line"/>
                </IconButton>
                <Drawer
                    anchor={"left"}
                    open={openMenuDrawer}
                    onClose={handleCloseMenuDrawer}
                >
                    <Box sx={{ width: "100%" }} role="presentation">
                        <List>
                            {pages.map((page, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => router.visit(page.href)} disabled={page.disabled}>
                                        <ListItemIcon>
                                            {page.startIcon}
                                        </ListItemIcon>
                                        <ListItemText primary={page.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                }}
            >
                {pages.map((page, index) => (
                    <Button
                        variant="text"
                        key={index}
                        onClick={() => router.visit(page.href)}
                        disabled={page.disabled}
                        sx={{
                            my: 2,
                            color: "var(--dark-color)",
                        }}
                        startIcon={page.startIcon}
                    >
                        {page.label}
                    </Button>
                ))}
            </Box>
        </>
    );
}
