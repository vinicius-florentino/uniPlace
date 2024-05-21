import React, { useState, useEffect } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm, router } from "@inertiajs/react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Loading from "@/Components/Loading";
import AdCard from "@/Components/cards/AdCard";
import Pagination from "@mui/material/Pagination";
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import Alert from "@mui/material/Alert";
import CheckBoxFilters from "../Components/CheckBoxFilters";

export default function Ads({ ads, auth, adsCategories }) {
    const searchParams = new URLSearchParams(window.location.search);    

    const { data, setData, get, processing } = useForm({
        search: searchParams.get("search") || "",
        filters: { ads_categories: [] }
    });

    const [loading, setLoading] = useState(false);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData("search", value);
    };

    const handlePaginationChange = (e, page) => {
        setLoading(true);
        router.visit("/ads", {
            data: { page, search: data.search },
            onFinish: () => setLoading(false),
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        get("/ads", {
            data,
            onFinish: () => setLoading(false),
            preserveScroll: true,
        });
    };

    let paginationTotal = ads?.last_page;

    let actualPage = ads?.current_page;

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Anúncios" />

            <Box component="form" onSubmit={onSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SearchField
                            value={data.search}
                            onChange={handleSearchChange}
                            disabled={processing}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CheckBoxFilters
                            adsCategories={adsCategories}
                            setData={setData}
                        />
                    </Grid>
                </Grid>
            </Box>
            {!loading && (
                <>
                    <Box sx={{ my: 2 }}>
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
                                        sellerName={ad?.seller?.name}
                                        price={ad.price}
                                        title={ad.title}
                                        to={`/ad/${ad.id}`}
                                        imageSrc={ad.image_url}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {ads.data.length === 0 && (
                        <Box sx={{ width: "100%" }}>
                            <Alert severity="info">Nenhum anúncio foi encontrado</Alert>
                        </Box>
                    )}
                    {ads.data.length >= 1 && (
                        <Box>
                            <Pagination
                                color="primary"
                                page={actualPage}
                                count={paginationTotal}
                                onChange={handlePaginationChange}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
            {loading && <Loading />}
        </NavigationLayout>
    );
}
