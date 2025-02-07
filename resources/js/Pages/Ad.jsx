import React, { useState } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    Typography,
    Button,
    Chip,
    Avatar,
    Box,
    Grid,
    Alert
} from "@mui/material";
import formatPrice from "@/Utils/formatPrice";
import formatDate from "@/Utils/formatDate";
import PageBox from "@/Components/pagebox/PageBox";
import RemixIcon from "@/Components/RemixIcon";
import Image from "@/Components/Image";
import Tooltip from "@mui/material/Tooltip";
import formatDateTime from "@/Utils/formatDateTime";
import dayjs from "dayjs";

export default function Ad({ ad, auth }) {

    const [loading, setLoading] = useState(false);

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

    const redirectToWhatsApp = () => {
        if (ad.seller.phone) {
            const whatsappLink = `https://wa.me/${ad.seller.phone}?text=${encodeURIComponent(`Olá, gostaria de falar sobre o ${ad.title}`)}`;
            window.open(whatsappLink, '_blank');
        }
    };

    const redirectToChat = () => {
        setLoading(true);
        router.get(
            "/conversations/start",
            { id: ad.seller.id, ad_id: ad.id },
            {
                onSuccess: () => { setLoading(false) },
            }
        );
    };

    return (
        <NavigationLayout user={auth?.user}>
            <Head title={ad.title} />
            <Box
                sx={{
                    width: "100%",
                }}
            >
                {ad?.seller?.id === auth?.user?.seller?.id && (
                    <Box sx={{ width: "100%", mb: 2 }}>
                        <Alert severity="info">
                            Seu anúncio é visto assim por possíveis clientes
                        </Alert>
                    </Box>
                )}
                {!ad.enabled && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        O anúncio está desabilitado
                    </Alert>
                )}
                <Grid
                    container
                    spacing={2}
                    rowSpacing={2}
                    sx={{ display: "flex", alignItems: "stretch" }}
                >
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ width: "100%", height: { md: "430px" } }}
                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                borderRadius: "16px",
                                backgroundColor: "var(--white-color)",
                                height: "100%",
                            }}
                            noValidate
                        >
                            <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
                                <Image
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    src={ad.image_url}
                                />
                                {(ad?.up_usage?.expires_at && dayjs(ad?.up_usage?.expires_at) > dayjs()) && (
                                    <Tooltip title={`Promovido até ${formatDateTime(
                                        ad?.up_usage?.expires_at
                                    )}`} arrow>
                                        <Chip
                                            sx={{
                                                position: "absolute",
                                                top: 20,
                                                left: 10,
                                                backgroundColor: "var(--primary-color)",
                                                color: "var(--white-color)",
                                                fontSize: 12,
                                                fontWeight: 500,
                                            }}
                                            size="small"
                                            variant="filled"
                                            label="UP"
                                            icon={
                                                <RemixIcon
                                                    className="ri-arrow-up-circle-line"
                                                    color="var(--white-color)"
                                                />
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </Box>

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <PageBox>
                            <Grid container rowSpacing={2} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: 24 }}
                                    >
                                        {ad.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: 20 }}
                                    >
                                        {formatPrice(ad.price)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: 14 }}
                                    >
                                        Categoria: {ad?.category?.name || "Sem categoria"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: 14 }}
                                    >
                                        Sobre o vendedor
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip
                                        onClick={() => router.visit(`/seller/${ad.seller.id}`)}
                                        component={"a"}
                                        clickable
                                        label={ad.seller.name}
                                        avatar={
                                            <Avatar
                                                {...stringAvatar(
                                                    ad.seller.name
                                                )}
                                                sx={{
                                                    bgcolor: "background.paper",
                                                    color: "var(--dark-color)",
                                                }}
                                            />
                                        }
                                    />
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
                                        disabled={!ad.seller.phone || auth?.user?.seller?.id === ad.seller.id || loading}
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
                                        disabled={auth?.user?.seller?.id === ad.seller.id || loading}
                                    >
                                        Inicie uma conversa via Chat
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: 14 }}
                                    >
                                        Criado em: {formatDate(ad.created_at)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBox title={"Descrição"}>
                            <Grid container rowSpacing={2} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="p">
                                        {ad.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
