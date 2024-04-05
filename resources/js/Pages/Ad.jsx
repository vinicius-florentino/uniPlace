import React from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm, router } from "@inertiajs/react";
import Grid from "@mui/material/Grid"
import Brigadeiro from "../Assets/brigadeiro.webp";
import Box from "@mui/material/Box"
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import formatPrice from "@/Utils/formatPrice";
import Button from '@mui/material/Button';
import PageBox from "@/Components/pagebox/PageBox";
import RemixIcon from "@/Components/RemixIcon";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export default function Ad({ ad, auth }) {
    const { data, setData, post, processing, errors } = useForm({});

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

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Página inicial" />
            <Box sx={{
                width: "100%"
            }}>
                <Grid container spacing={2} rowSpacing={2} display={"flex"} >
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                maxHeight: "auto",
                                borderRadius: "16px",
                                textDecoration: "none",
                                backgroundColor: "var(--white-color)",
                            }}
                            noValidate
                        >
                            <Box
                                sx={{
                                    p: 0,
                                    m: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={12} md={6} lg={6} >
                                        <img
                                            style={{
                                                width: "92%",
                                                objectFit: "cover",
                                                backgroundColor: "white",
                                            }}
                                            src={Brigadeiro}
                                            alt="Brigadeiro"
                                        />
                                    </Grid>
                                    <Grid item md={6} lg={6} xs={12}>
                                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }}>
                                            <Grid>
                                                <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
                                                    {ad.title}
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
                                                    {formatPrice(ad.price)}
                                                </Typography>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PageBox title={"Sobre o vendedor"}>
                           <Grid container rowSpacing={2} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 400, fontSize: 16, marginBottom: "10px" }}>
                                        <Chip
                                            label={ad.seller.name}
                                            avatar={
                                                <Avatar {...stringAvatar(ad.seller.name)} sx={{
                                                    bgcolor: 'background.paper',
                                                    color: 'var(--dark-color)'
                                                }} />
                                            }
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="containedSuccess" startIcon={<RemixIcon className="ri-whatsapp-line" color={"var(--success-color)"} />}>
                                        Inicie uma conversa via WhatsApp
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="containedLight" startIcon={<RemixIcon className="ri-chat-1-line" color={"var(--dark-color)"} />}>
                                        Inicie uma conversa via Chat
                                    </Button>
                                </Grid>
                           </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBox title={"Descrição"}>
                            <Typography sx={{ fontWeight: 400, fontSize: 14, textAlign: "justify" }}>
                                {ad.description}
                            </Typography>
                        </PageBox>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
