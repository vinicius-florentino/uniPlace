import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";

import RemixIcon from "@/Components/RemixIcon";

export default function PersonalMenu({ userName }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const { post } = useForm({});

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

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);

    const handleOpenMenuDrawer = () => {
        setOpenMenuDrawer(true);
    };

    const handleCloseMenuDrawer = () => {
        setOpenMenuDrawer(false);
    };

    function stringAvatar(name) {
        const initials = name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0])
            .join("");

        return {
            children: initials.toUpperCase(),
        };
    }

    return (
        <>
            <Tooltip title="Menu pessoal">
                <IconButton onClick={handleOpenMenuDrawer}>
                    <Avatar
                        {...stringAvatar(userName)}
                        alt={userName.toUpperCase()}
                    />
                    {/* <AccountCircleIcon
                        color="var(--dark-color)"
                        fontSize="large"
                    /> */}
                </IconButton>
            </Tooltip>
            <Drawer
                anchor={"right"}
                open={openMenuDrawer}
                onClose={handleCloseMenuDrawer}
            >
                <Box sx={{ width: "100%" }} role="presentation">
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Avatar
                                    {...stringAvatar(userName)}
                                    alt={userName.toUpperCase()}
                                />
                            </ListItemIcon>
                            <ListItemText primary={userName} />
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseMenuDrawer}
                                sx={{
                                    position: "absolute",
                                    right: 5,
                                    top: 2,
                                }}
                            >
                                <RemixIcon className="ri-close-line" />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItemButton href={"/profile"}>
                            <ListItemIcon>
                                <RemixIcon className="ri-user-line" />
                            </ListItemIcon>
                            <ListItemText primary={"Meu perfil"} />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <RemixIcon className="ri-dashboard-line" />
                            </ListItemIcon>
                            <ListItemText primary="Painel para vendedores" />
                            {open ? (
                                <RemixIcon className="ri-arrow-up-wide-line" />
                            ) : (
                                <RemixIcon className="ri-arrow-down-wide-line" />
                            )}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 4 }}>
                                <ListItemButton
                                    href={"/seller-dashboard/profile"}
                                >
                                    <ListItemIcon>
                                        <RemixIcon className="ri-user-2-line" />
                                    </ListItemIcon>
                                    <ListItemText primary="Meu perfil de vendas" />
                                </ListItemButton>
                                <ListItemButton href={"/seller-dashboard/ads"}>
                                    <ListItemIcon>
                                        <RemixIcon className="ri-price-tag-3-line" />
                                    </ListItemIcon>
                                    <ListItemText primary="Meus anúncios" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <RemixIcon className="ri-settings-line" />
                            </ListItemIcon>
                            <ListItemText primary={"Configurações"} />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <RemixIcon className="ri-logout-box-line" color={"var(--danger-color)"}/>
                            </ListItemIcon>
                            <ListItemText
                                sx={{ color: "var(--danger-color)" }}
                                primary={"Sair"}
                            />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
