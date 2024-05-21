import React, { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import Switch from "@mui/material/Switch";
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
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemixIcon from "@/Components/RemixIcon";
import stringAvatar from "@/Utils/stringAvatar";

export default function PersonalMenu({ user }) {

    const { post } = useForm({});

    const [isPersonalMenuSeller, setIsPersonalMenuSeller] = useState(() => {
        const storedState = localStorage.getItem("personalMenuSeller");
        return storedState ? JSON.parse(storedState) : false;
    });

    const displayName = isPersonalMenuSeller && user?.seller ? user?.seller?.name : user.name;

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);

    const handleOpenMenuDrawer = () => {
        setOpenMenuDrawer(true);
    };

    const handleCloseMenuDrawer = () => {
        setOpenMenuDrawer(false);
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

    const handleSwitchChange = (event) => {
        const { checked } = event.target;
        setIsPersonalMenuSeller(checked);
        localStorage.setItem("personalMenuSeller", JSON.stringify(checked));
    };

    useEffect(() => {
        if (isPersonalMenuSeller && !user?.seller) {
            setIsPersonalMenuSeller(false);
            localStorage.setItem("personalMenuSeller", JSON.stringify(false));
        }
    }, [user, isPersonalMenuSeller]);

    return (
        <>
            <Tooltip arrow title="Menu pessoal">
                <IconButton onClick={handleOpenMenuDrawer}>
                    <Avatar
                        {...stringAvatar(displayName)}
                        alt={displayName.toUpperCase()}
                    />
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
                                    {...stringAvatar(displayName)}
                                    alt={displayName.toUpperCase()}
                                />
                            </ListItemIcon>
                            <ListItemText primary={displayName} />
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
                        {user?.seller && (
                            <>
                                <FormControlLabel
                                    sx={{ marginLeft: "5px" }}
                                    control={
                                        <Switch
                                            checked={isPersonalMenuSeller}
                                            onChange={handleSwitchChange}
                                        />
                                    }
                                    label="Troque de perfil"
                                />
                                <Divider sx={{ my: 1 }} />
                            </>
                        )}
                        {isPersonalMenuSeller && (
                            <>
                                <ListItemButton
                                    disabled={!user?.seller}
                                    onClick={() =>
                                        router.visit(
                                            `/seller/${user?.seller?.id}`
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <RemixIcon className="ri-user-2-line" />
                                    </ListItemIcon>
                                    <ListItemText primary="Meu perfil de vendedor" />
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() =>
                                        router.visit("/seller-dashboard/ads")
                                    }
                                    disabled={!user?.seller}
                                >
                                    <ListItemIcon>
                                        <RemixIcon className="ri-price-tag-3-line" />
                                    </ListItemIcon>
                                    <ListItemText primary="Meus anúncios" />
                                </ListItemButton>
                            </>
                        )}
                        {!isPersonalMenuSeller && (
                            <>
                                <ListItemButton
                                    onClick={() =>
                                        router.visit(`/user/${user.id}`)
                                    }
                                >
                                    <ListItemIcon>
                                        <RemixIcon className="ri-user-line" />
                                    </ListItemIcon>
                                    <ListItemText primary={"Meu perfil"} />
                                </ListItemButton>
                            </>
                        )}
                        <ListItemButton
                            onClick={() => router.visit("/conversations")}
                        >
                            <ListItemIcon>
                                <RemixIcon className="ri-discuss-line" />
                            </ListItemIcon>
                            <ListItemText primary={"Conversas"} />
                        </ListItemButton>
                        <Divider sx={{ my: 1 }} />
                        <ListItemButton
                            onClick={() => router.visit("/settings")}
                        >
                            <ListItemIcon>
                                <RemixIcon className="ri-settings-line" />
                            </ListItemIcon>
                            <ListItemText primary={"Configurações"} />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <RemixIcon
                                    className="ri-logout-box-line"
                                    color={"var(--danger-color)"}
                                />
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
