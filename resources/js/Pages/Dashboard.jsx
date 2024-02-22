import React, { useState } from "react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box"
import SearchField from "@/Layouts/NavigationLayout/Components/SearchField";
import AdCard from "@/Components/cards/AdCard";
import Grid from '@mui/material/Grid';
export default function Dashboard({ auth, ads }) {

    // const { data, setData, post, processing, errors } = useForm({});

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
                                <Grid item xs={6} md={3} xl={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <AdCard key={index} sellerName={ad.seller.name} price={ad.price} title={ad.title} />
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
