import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import {
    Typography,
    Box,
    Grid,
    Button,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    ListItemText,
    ListItemIcon,
    Alert,
} from "@mui/material";
import RemixIcon from "@/Components/RemixIcon";
import AdCard from "@/Components/cards/AdCard";
import PageBoxInheritSection from "@/Components/pagebox/PageBoxInheritSection";
import stringAvatar from "@/Utils/stringAvatar";

export default function Seller({ seller, auth }) {
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectToWhatsApp = () => {
        if (seller.phone) {
            const whatsappLink = `https://wa.me/${seller.phone
                }?text=${encodeURIComponent(`Olá, ${seller.name}`)}`;
            window.open(whatsappLink, "_blank");
        }
    };

    console.log(seller);
    console.log("====")
    console.log(auth);
    console.log("====")
    console.log(ads)

    const redirectToChat = () => {
        setLoading(true);
        router.get(
            "/conversations/start",
            { id: ad.seller.id, ad_id: ad.id },
            {
                onSuccess: () => {
                    setLoading(false);
                },
            }
        );
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title={seller.name} />
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    spacing={2}
                    rowSpacing={2}
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                        <PageBox>
                            {seller.user_id === auth.user.id && (
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
                                            sx: { p: 0 },
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() =>
                                                router.visit("/settings/seller")
                                            }
                                        >
                                            <ListItemIcon>
                                                <RemixIcon
                                                    className="ri-edit-line"
                                                    fontSize={"18px"}
                                                />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Editar informações
                                            </ListItemText>
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
                                        {...stringAvatar(seller.name)}
                                        alt={seller.name.toUpperCase()}
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
                                        {seller.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="containedSuccess"
                                        startIcon={
                                            <RemixIcon
                                                className="ri-whatsapp-line"
                                                color={"var(--success-color)"}
                                            />
                                        }
                                        disabled={
                                            !seller.phone ||
                                            auth.user.seller.id === seller.id
                                        }
                                        onClick={redirectToWhatsApp}
                                    >
                                        Inicie uma conversa via WhatsApp
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="containedLight"
                                        startIcon={
                                            <RemixIcon
                                                className="ri-chat-1-line"
                                                color={"var(--dark-color)"}
                                            />
                                        }
                                        onClick={redirectToChat}
                                        disabled={loading}
                                    >
                                        Inicie uma conversa via Chat
                                    </Button>
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBoxInheritSection
                            title={`Anúncios de ${seller.name}`}
                            subTitle={"Todos os anúncios feitos pelo vendedor"}
                        >
                            {seller.ads.length === 0 && (
                                <Box sx={{ width: "100%" }}>
                                    <Alert severity="info">
                                        Nenhum anúncio foi encontrado
                                    </Alert>
                                </Box>
                            )}
                            <Grid container spacing={2} rowSpacing={0}>
                                {seller.ads.map((ad, index) => (
                                    <Grid
                                        key={index}
                                        item
                                        xs={6}
                                        sm={4}
                                        md={3}
                                        lg={2}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <AdCard
                                            price={ad.price}
                                            title={ad.title}
                                            imageSrc={ad.image_url}
                                            href={`/ad/${ad.id}`}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </PageBoxInheritSection>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
