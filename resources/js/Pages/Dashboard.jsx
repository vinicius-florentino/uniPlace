import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import PageBoxInheritSection from "@/Components/pagebox/PageBoxInheritSection";

import Carousel from "react-material-ui-carousel";
import { Head, useForm } from "@inertiajs/react";
import { Box, Grid, Paper, Container } from "@mui/material";

import AdCard from "@/Components/cards/AdCard";
import RemixIcon from "@/Components/RemixIcon";
import Image from "@/Components/Image";

import Banner1Lg from "@/Assets/BannerUniplace300_1200.webp";
import Banner2Lg from "@/Assets/BannerLanche300_1200.webp";
import Banner3Lg from "@/Assets/BannerVan300_1200.webp";

import Banner1Xs from "@/Assets/BannerUniplace300_600.webp";
import Banner2Xs from "@/Assets/BannerLanche300_600.webp";
import Banner3Xs from "@/Assets/BannerVan300_600.webp";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

    const theme = useTheme();
    const greaterThanXs = useMediaQuery(theme.breakpoints.up("xs"));
    const greaterThanSm = useMediaQuery(theme.breakpoints.up("sm"));
    const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
    const greaterThanLg = useMediaQuery(theme.breakpoints.up("lg"));

    const items = [
        {
            src: !greaterThanMd ? Banner1Xs : Banner1Lg,
        },
        {
            src: !greaterThanMd ? Banner2Xs : Banner2Lg,
        },
        {
            src: !greaterThanMd ? Banner3Xs : Banner3Lg,
        },
    ];

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Página inicial" />

            <Container maxWidth="lg">
                <Box
                    sx={{
                        py: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                    }}
                >
                    <Box>
                        <Carousel
                            navButtonsAlwaysVisible
                            animation={"fade"}
                            interval={5000}
                            swipe={false}
                            sx={{
                                minHeight: greaterThanLg
                                    ? "300px"
                                    : greaterThanMd
                                    ? "240px"
                                    : greaterThanSm
                                    ? "340px"
                                    : greaterThanXs
                                    ? "180px"
                                    : "120px",
                                padding: "0px",
                            }}
                            NextIcon={
                                <RemixIcon
                                    className={"ri-arrow-right-s-line"}
                                />
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
                            indicators={false}
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
                            {items?.map((item, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 0,
                                        height: "95%",
                                        width: "100%",
                                        m: 0,
                                        backgroundColor: "transparent",
                                    }}
                                    elevation={0}
                                >
                                    <Image
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "fill",
                                        }}
                                        src={item.src}
                                    />
                                </Paper>
                            ))}
                        </Carousel>
                    </Box>
                    <Box component="form" onSubmit={onSubmit} noValidate>
                        <SearchField
                            onSubmit={onSubmit}
                            onChange={handleSearchChange}
                            disabled={processing}
                            value={data.search}
                        />
                    </Box>
                </Box>
            </Container>

            <Box sx={{ backgroundColor: "var(--white-color)", py: 4 }}>
                <Container maxWidth="lg">
                    <PageBoxInheritSection
                        title="Promovidos"
                        subTitle="Anúncios promovidos por vendedores"
                    >
                        <Grid container spacing={2} rowSpacing={0}>
                            {ads.data.map((ad, index) => (
                                <Grid
                                    key={index}
                                    item
                                    xs={6}
                                    sm={3}
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

            <Box sx={{ py: 4 }}>
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
                                    sm={3}
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
        </DashboardLayout>
    );
}
