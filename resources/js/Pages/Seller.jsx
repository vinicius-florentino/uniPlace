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
    Alert,
} from "@mui/material";
import RemixIcon from "@/Components/RemixIcon";
import AdCard from "@/Components/cards/AdCard";
import PageBoxInherit from "@/Components/pagebox/PageBoxInherit";
import stringAvatar from "@/Utils/stringAvatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

export default function Seller({ seller, auth }) {

    const theme = useTheme();
    const greaterThanXs = useMediaQuery(theme.breakpoints.up("xs"));
    const greaterThanSm = useMediaQuery(theme.breakpoints.up("sm"));
    const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
    const greaterThanLg = useMediaQuery(theme.breakpoints.up("lg"));

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
            const whatsappLink = `https://wa.me/${
                seller.phone
            }?text=${encodeURIComponent(`Olá, ${seller.name}`)}`;
            window.open(whatsappLink, "_blank");
        }
    };

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
                                        disabled={auth.user.seller.id === seller.id || loading}
                                    >
                                        Inicie uma conversa via Chat
                                    </Button>
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBoxInherit
                            title={`Anúncios de ${seller.name}`}
                            subTitle={"Todos os anúncios feitos pelo vendedor"}
                        >
                            <Swiper
                                className="mySwiper"
                                spaceBetween={16}
                                slidesPerView={
                                    greaterThanLg
                                        ? 6
                                        : greaterThanMd
                                        ? 5
                                        : greaterThanSm
                                        ? 4
                                        : greaterThanXs
                                        ? 2
                                        : 2
                                }
                                slidesPerGroup={
                                    greaterThanLg
                                        ? 6
                                        : greaterThanMd
                                        ? 5
                                        : greaterThanSm
                                        ? 4
                                        : greaterThanXs
                                        ? 2
                                        : 2
                                }
                                navigation={true}
                                modules={[Navigation]}
                            >
                                {seller?.ads?.map((ad, index) => (
                                    <SwiperSlide key={index}>
                                        <AdCard
                                            price={ad.price}
                                            title={ad.title}
                                            imageSrc={ad.image_url}
                                            to={`/ad/${ad.id}`}
                                            promotedUntil={ad?.up_usage?.expires_at}
                                        />
                                    </SwiperSlide>
                                ))}
                                {seller?.ads?.length === 0 && (
                                    <Alert severity="info">
                                        Não foi possível encontrar nenhum
                                        anúncio
                                    </Alert>
                                )}
                            </Swiper>
                        </PageBoxInherit>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
