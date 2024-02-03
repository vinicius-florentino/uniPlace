import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function PersonalMenu({ userName }) {
    const { post } = useForm({});

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
            <Tooltip title="Menu pessoal">
                <IconButton onClick={handleOpenUserMenu}>
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
                <MenuItem>Olá, {userName}.</MenuItem>

                <Divider />

                <MenuItem
                    component="a"
                    onClick={handleCloseUserMenu}
                    href={route("profile.edit")}
                >
                    Perfil
                </MenuItem>

                <MenuItem
                    component="a"
                    onClick={handleCloseUserMenu}
                    href={route("seller.dashboard")}
                >
                    Painel vendedor
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
        </>
    );
}
