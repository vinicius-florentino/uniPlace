import React, { useState } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm, router } from "@inertiajs/react";
import Box from "@mui/material/Box";
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import AdCard from "@/Components/cards/AdCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import Pagination from "@mui/material/Pagination";
// import Loading from "@/Components/Loading";
import Carousel from "react-material-ui-carousel";

export default function Dashboard({ auth, ads }) {

    const { data, setData, get, processing, errors } = useForm({
        search: "",
    });

    // let paginationTotal = ads?.last_page;
    // let actualPage = ads?.current_page;

    // const handlePaginationChange = (e, page) => {
    //     router.visit("/", {
    //         data: { page },
    //     });
    // };

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
        { id: 1, title: "Slide 1", description: "Descrição do Item 1" },
        { id: 2, title: "Slide 2", description: "Descrição do Item 2" },
        { id: 3, title: "Slide 3", description: "Descrição do Item 3" },
    ];

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Página inicial" />

            <Box sx={{ pb: 2 }}>
                <Carousel navButtonsAlwaysVisible animation={"slide"}>
                    {items.map((item) => (
                        <Paper
                            key={item.id}
                            sx={{
                                height: "320px",
                                backgroundColor: "var(--white-color)",
                                color: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h5">{item.title}</Typography>
                        </Paper>
                    ))}
                </Carousel>
            </Box>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ pb: 2 }}>
                <SearchField
                    onSubmit={onSubmit}
                    onChange={handleSearchChange}
                    disabled={processing}
                    value={data.search}
                />
            </Box>

            <Box sx={{ pb: 2 }}>
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
            </Box>
            {/* <Box>
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
            </Box> */} 
        </NavigationLayout>
    );
}
