import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsIcon from '@mui/icons-material/Settings';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

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
                                <CloseIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItemButton href={route("profile.edit")}>
                            <ListItemIcon>
                                <Person2OutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Meu perfil"} />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <SpaceDashboardOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Painel para vendedores" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 4 }}>
                                <ListItemButton href={"/seller-dashboard/profile"}>
                                    <ListItemIcon>
                                        <AssignmentIndOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Meu perfil de vendas" />
                                </ListItemButton>
                                <ListItemButton href={"/seller-dashboard/ads"}>
                                    <ListItemIcon>
                                        <LocalOfferOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Meus anúncios" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Configurações"} />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon sx={{ color: "var(--danger-color)" }}>
                                <LogoutOutlinedIcon />
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
