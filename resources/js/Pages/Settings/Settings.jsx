import React from "react";
import { Head, router } from "@inertiajs/react";

import {
    Box,
    Grid,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    Alert,
    Avatar,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";

import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import RemixIcon from "@/Components/RemixIcon";
import stringAvatar from "@/Utils/stringAvatar";

import UserProfileSettings from "./components/UserProfileSettings";
import SellerProfileSettings from "./components/SellerProfileSettings";

const AvatarWithName = ({ name, profileLink }) => {
    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar
                    sx={{ height: 32, width: 32, fontSize: 14 }}
                    {...stringAvatar(name)}
                    alt={name.toUpperCase()}
                />
                <Typography sx={{ fontSize: 14 }} noWrap={true}>
                    {name}
                </Typography>
                <IconButton onClick={() => router.visit(profileLink)}>
                    <RemixIcon className="ri-external-link-line" />
                </IconButton>
            </Box>
        </Box>
    );
};

export const Settings = ({ auth }) => {
    const { user } = auth;
    const pathname = window.location.pathname;

    const headTitleMap = {
        "/settings/user": "Configurações - Usuário",
        "/settings/seller": "Configurações - Vendedor",
        "/settings": "Configurações",
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
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                {/* <RemixIcon className="ri-user-2-line" /> */}
                                <AvatarWithName
                                    name={user.name}
                                    profileLink={`/user/${user.id}`}
                                />
                                {user.seller && (
                                    <AvatarWithName
                                        name={user.seller.name}
                                        profileLink={`/seller/${user.seller.id}`}
                                    />
                                )}
                            </Box>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PageBox>
                            <MenuList sx={{ p: 0 }}>
                                <MenuItem disabled>
                                    <ListItemText>Conta</ListItemText>
                                </MenuItem>
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
                                <Divider />
                                <MenuItem disabled>
                                    <ListItemText>Sobre</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <RemixIcon className="ri-article-line" />
                                    </ListItemIcon>
                                    <ListItemText onClick={()=> router.visit('/privacy-terms')}>
                                        Termos de privacidade
                                    </ListItemText>
                                </MenuItem>
                            </MenuList>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {pathname === "/settings" && (
                            <Alert severity="info">
                                Nenhuma opção de configurações selecionada
                            </Alert>
                        )}
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
