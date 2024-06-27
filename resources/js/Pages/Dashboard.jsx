import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import PageBoxInherit from "@/Components/pagebox/PageBoxInherit";

import { Head, useForm } from "@inertiajs/react";
import { Box, Paper, Container, Alert } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import AdCard from "@/Components/cards/AdCard";
import Image from "@/Components/Image";

import Banner1Lg from "@/Assets/BannerUniplace300_1200.webp";
import Banner2Lg from "@/Assets/BannerLanche300_1200.webp";
import Banner3Lg from "@/Assets/BannerVan300_1200.webp";

import Banner1Xs from "@/Assets/BannerUniplace300_600.webp";
import Banner2Xs from "@/Assets/BannerLanche300_600.webp";
import Banner3Xs from "@/Assets/BannerVan300_600.webp";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Dashboard({ auth, recentAds, promotedAds }) {

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
                        <Swiper
                            className="mySwiper"
                            slidesPerView={1}
                            slidesPerGroup={1}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Navigation, Autoplay]}
                        >
                            {items?.map((item, index) => (
                                <SwiperSlide key={index}>
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
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
                    <PageBoxInherit
                        title="Promovidos"
                        subTitle="Anúncios promovidos por vendedores"
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
                            {promotedAds?.data?.map((ad, index) => (
                                <SwiperSlide key={index}>
                                    <AdCard
                                        sellerName={ad.seller.name}
                                        price={ad.price}
                                        title={ad.title}
                                        imageSrc={ad.image_url}
                                        to={`/ad/${ad.id}`}
                                        promotedUntil={ad?.up_usage?.expires_at}
                                    />
                                </SwiperSlide>
                            ))}
                            {promotedAds?.data?.length === 0 && (
                                <Alert severity="info">
                                    Não foi possível encontrar nenhum anúncio
                                </Alert>
                            )}
                        </Swiper>
                    </PageBoxInherit>
                </Container>
            </Box>

            <Box sx={{ py: 4 }}>
                <Container maxWidth="lg">
                    <PageBoxInherit
                        title="Mais recentes"
                        subTitle="Anúncios feitos recentemente por vendedores"
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
                            {recentAds?.data?.map((ad, index) => (
                                <SwiperSlide key={index}>
                                    <AdCard
                                        sellerName={ad.seller.name}
                                        price={ad.price}
                                        title={ad.title}
                                        imageSrc={ad.image_url}
                                        to={`/ad/${ad.id}`}
                                        promotedUntil={ad?.up_usage?.expires_at}
                                    />
                                </SwiperSlide>
                            ))}
                            {recentAds?.data?.length === 0 && (
                                <Alert severity="info">
                                    Não foi possível encontrar nenhum anúncio
                                </Alert>
                            )}
                        </Swiper>
                    </PageBoxInherit>
                </Container>
            </Box>
        </DashboardLayout>
    );
}
