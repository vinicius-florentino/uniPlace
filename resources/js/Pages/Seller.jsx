import React from "react";
import { Head, useForm, router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import { Typography, Box, Grid, Button, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import RemixIcon from "@/Components/RemixIcon";
import AdCard from "@/Components/cards/AdCard";
import PageBoxInheritSection from "@/Components/pagebox/PageBoxInheritSection";
import stringAvatar from "@/Utils/stringAvatar";

export default function Seller({ seller, auth, ads }) {

    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, errors } = useForm({});
    const [disabledButton, setDisabledButton] = useState(true);

    const redirectToWhatsApp = () => {
        if (seller.phone) {
            const whatsappLink = `https://wa.me/${
                seller.phone
            }?text=${encodeURIComponent(`Olá, ${seller.name}`)}`;
            window.location.href = whatsappLink;
        }
    };

    const redirectToChat = () => {
        setLoading(true);
        router.get(
            "/conversations/start",
            { id: ad.seller.id, ad_id: ad.id },
            {
                onSuccess: () => {setLoading(false)},
            }
        );
    };

    useEffect(() => {
        setDisabledButton(!seller.phone);
    }, [seller.phone]);

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
                                        disabled={disabledButton}
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
