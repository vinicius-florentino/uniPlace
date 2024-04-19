import React from "react";
import { Head } from "@inertiajs/react";
import { Typography, Box, Grid, Button, Avatar } from "@mui/material";
import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import stringAvatar from "@/Utils/stringAvatar";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";

export default function User({ user, auth }) {
    console.log(user)
    return (
        <NavigationLayout user={auth.user}>
            <Head title={user.name} />
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={2} rowSpacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <PageBox>
                            <Grid container spacing={2} sx={{ justifyContent: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Grid item xs={12}>
                                    <Avatar
                                        {...stringAvatar(user.name)}
                                        alt={user.name.toUpperCase()}
                                        sx={{ width: "144px", height: "144px", fontSize: 40 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
                                        {user.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBoxRedirect
                            title={`Perfil de vendedor de ${user.name}`}
                            href={`/seller/${user.id}`}
                        ></PageBoxRedirect>
                    </Grid>
                    {auth.user.id === user.id &&
                    <Grid item xs={12}>
                        <PageBoxRedirect
                            title="Minhas informações"
                            href="/profile"
                        ></PageBoxRedirect>
                    </Grid>
                    }
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
