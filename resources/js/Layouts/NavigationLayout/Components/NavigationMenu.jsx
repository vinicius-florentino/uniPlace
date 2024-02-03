import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function NavigationMenu({}) {
    const pages = [
        {
            label: "Início",
            href: "/",
            startIcon: <HomeOutlined />,
        },
        {
            label: "Planos",
            href: "/plans",
            startIcon: <BusinessCenterOutlinedIcon />,
        },
        {
            label: "Ajuda",
            href: "#",
            startIcon: <HelpOutlineOutlinedIcon />,
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
                    flexGrow: 0,
                    display: { xs: "flex", md: "none" },
                    ml: 1,
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
                    <Box sx={{ width: 250 }} role="presentation">
                        <List>
                            {pages.map((page, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton href={page.href}>
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
                    justifyContent: "end",
                }}
            >
                {pages.map((page, index) => (
                    <Button
                        variant="text"
                        key={index}
                        href={page.href}
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
