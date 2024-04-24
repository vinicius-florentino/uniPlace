import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import PageBoxInheritSection from "@/Components/pagebox/PageBoxInheritSection";

import Carousel from "react-material-ui-carousel";
import { Head, useForm } from "@inertiajs/react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";

import AdCard from "@/Components/cards/AdCard";
import RemixIcon from "@/Components/RemixIcon";
import Image from "@/Components/Image";

import Banner1 from "@/Assets/dashboard_banner1.webp";
import Banner2 from "@/Assets/dashboard_banner2.webp";

export default function Dashboard({ auth, ads }) {

    const { data, setData, get, processing } = useForm({
        search: "",
    });

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData("search", value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        get("/ads", {
            data,
            preserveScroll: true,
        });
    };

    const items = [
        {
            id: 1,
            content: (
                <Image
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "fill",
                    }}
                    src={Banner1}
                />
            ),
        },
        {
            id: 2,
            content: (
                <Image
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "fill",
                    }}
                    src={Banner2}
                />
            ),
        },
    ];

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Página inicial" />

            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Carousel
                        navButtonsAlwaysVisible
                        animation={"fade"}
                        interval={5000}
                        swipe={false}
                        NextIcon={
                            <RemixIcon className={"ri-arrow-right-s-line"} />
                        }
                        PrevIcon={
                            <RemixIcon className={"ri-arrow-left-s-line"} />
                        }
                        IndicatorIcon={
                            <RemixIcon
                                className={"ri-circle-fill"}
                                fontSize={"14px"}
                                color={"var(--white-color)"}
                            />
                        }
                        activeIndicatorIconButtonProps={{
                            style: {
                                backgroundColor: "var(--dark-color)",
                            },
                        }}
                        navButtonsProps={{
                            style: {
                                backgroundColor: "var(--white-color)",
                                borderRadius: 300,
                            },
                        }}
                    >
                        {items.map((item, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    width: "100%",
                                    height: "300px",
                                    backgroundColor: "var(--white-color)",
                                    color: "#FFF",
                                }}
                            >
                                {item.content}
                            </Paper>
                        ))}
                    </Carousel>
                </Box>

                <Box
                    component="form"
                    onSubmit={onSubmit}
                    noValidate
                    sx={{ my: 4 }}
                >
                    <SearchField
                        onSubmit={onSubmit}
                        onChange={handleSearchChange}
                        disabled={processing}
                        value={data.search}
                    />
                </Box>
            </Container>

            <Box sx={{ my: 4 }}>
                <Container maxWidth="lg">
                    <PageBoxInheritSection
                        title="Mais recentes"
                        subTitle="Anúncios feitos recentemente por vendedores"
                    >
                        <Grid container spacing={2} rowSpacing={0}>
                            {ads.data.map((ad, index) => (
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
                                        sellerName={ad.seller.name}
                                        price={ad.price}
                                        title={ad.title}
                                        imageSrc={ad.image_url}
                                        href={`/ad/${ad.id}`}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </PageBoxInheritSection>
                </Container>
            </Box>

            {/* <Box sx={{ backgroundColor: "var(--white-color)", my: 4 }}>
                <Container maxWidth="lg">
                    <PageBoxInheritSection
                        title="Mais recentes"
                        subTitle="Anúncios feitos recentemente por vendedores"
                    >
                        <Grid container spacing={2} rowSpacing={0}>
                            {ads.data.map((ad, index) => (
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
                                        sellerName={ad.seller.name}
                                        price={ad.price}
                                        title={ad.title}
                                        imageSrc={ad.image_url}
                                        href={`/ad/${ad.id}`}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </PageBoxInheritSection>
                </Container>
            </Box> */}
        </DashboardLayout>
    );
}
