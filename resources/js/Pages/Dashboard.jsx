import React, { useState } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm, router } from "@inertiajs/react";
import Box from "@mui/material/Box"
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import AdCard from "@/Components/cards/AdCard";
import Grid from '@mui/material/Grid';
import Pagination from "@mui/material/Pagination";
import Loading from "@/Components/Loading";
export default function Dashboard({ auth, ads }) {

    // const { data, setData, post, processing, errors } = useForm({});
    const [loading, setLoading] = useState(false);

    let paginationTotal = ads?.last_page;

    let actualPage = ads?.current_page;

    const handlePaginationChange = (e, page) => {
        setLoading(true);
        router.visit("/", {
            data: { page },
            onFinish: () => setLoading(false),
        });
    };


    return (
        <NavigationLayout user={auth.user}>
            <Head title="Página inicial" />
            <Box sx={{ py: 2 }}>
                <SearchField />
            </Box>
            {!loading &&
                <>
                    <Box sx={{ pb: 2 }}>
                        <Grid container spacing={2} rowSpacing={0}>
                            {ads.data.map((ad, index) => (
                                <Grid key={index} item xs={6} sm={4} md={3} lg={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <AdCard sellerName={ad.seller.name} price={ad.price} title={ad.title} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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
                </>
            }{loading &&
                <Loading/>
            }
        </NavigationLayout >
    );
}
