import React from "react";
import { Head, router } from "@inertiajs/react";

import {
    Box,
    Grid,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    Typography,
} from "@mui/material";

import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";
import RemixIcon from "@/Components/RemixIcon";
import stringAvatar from "@/Utils/stringAvatar";

import UserProfileSettings from "./components/UserProfileSettings";
import SellerProfileSettings from "./components/SellerProfileSettings";

const AvatarWithName = ({ name }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <Avatar
                sx={{ height: 48, width: 48, fontSize: 16 }}
                {...stringAvatar(name)}
                alt={name.toUpperCase()}
            />
            <Typography sx={{ fontSize: 16 }}>{name}</Typography>
        </div>
    );
};

export const Settings = ({ auth }) => {
    const { user } = auth;
    const pathname = window.location.pathname;

    const headTitleMap = {
        "/settings/user": "Configurações - Usuário",
        "/settings/seller": "Configurações - Vendedor",
    };

    return (
        <NavigationLayout user={user}>
            <Head title={headTitleMap[pathname]} />
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PageBox
                            prependTitleIcon={
                                <RemixIcon className="ri-settings-line" />
                            }
                            title={"Configurações"}
                            subTitle={"Administre os dados de sua conta"}
                        >
                            <AvatarWithName name={user.name} />
                            {/* <AvatarWithName name={user.seller.name} /> */}
                        </PageBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PageBox>
                            <MenuList sx={{ p: 0 }}>
                                <Divider
                                    sx={{ pb: 2, fontSize: 12 }}
                                    textAlign="left"
                                >
                                    Conta
                                </Divider>
                                <MenuItem
                                    selected={pathname === "/settings/user"}
                                    onClick={() =>
                                        router.visit("/settings/user")
                                    }
                                >
                                    <ListItemIcon>
                                        <RemixIcon className="ri-user-line" />
                                    </ListItemIcon>
                                    <ListItemText>Usuário</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    selected={pathname === "/settings/seller"}
                                    onClick={() =>
                                        router.visit("/settings/seller")
                                    }
                                >
                                    <ListItemIcon>
                                        <RemixIcon className="ri-user-2-line" />
                                    </ListItemIcon>
                                    <ListItemText>Vendedor</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {pathname === "/settings/user" && (
                            <UserProfileSettings user={user} />
                        )}
                        {pathname === "/settings/seller" && (
                            <SellerProfileSettings user={user} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
};

export default Settings;
