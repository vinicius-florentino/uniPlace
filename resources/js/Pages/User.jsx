import React from "react";
import { Head, router } from "@inertiajs/react";
import {
    Typography,
    Box,
    Grid,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Tooltip
} from "@mui/material";
import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import stringAvatar from "@/Utils/stringAvatar";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";
import RemixIcon from "@/Components/RemixIcon";

export default function User({ user, auth }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title={user.name} />
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    spacing={2}
                    rowSpacing={2}
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                        <PageBox>
                            {auth.user.id === user.id && (
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        justifyContent: "end",
                                        display: "flex",
                                    }}
                                >
                                    <Tooltip
                                        title="Mais opções"
                                        arrow
                                        placement="left"
                                    >
                                        <IconButton onClick={handleOpen}>
                                            <RemixIcon className="ri-more-2-line" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() =>
                                                router.visit("/settings/user")
                                            }
                                        >
                                            Editar informações
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            )}
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    justifyContent: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <Grid item xs={12}>
                                    <Avatar
                                        {...stringAvatar(user.name)}
                                        alt={user.name.toUpperCase()}
                                        sx={{
                                            width: "144px",
                                            height: "144px",
                                            fontSize: 40,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: 24 }}
                                    >
                                        {user.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                    {user.seller && (
                        <Grid item xs={12}>
                            <PageBoxRedirect
                                title={`Perfil de vendedor de ${user.name} (${user.seller.name})`}
                                href={`/seller/${user.seller.id}`}
                            ></PageBoxRedirect>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
