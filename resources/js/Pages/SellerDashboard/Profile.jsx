import React from "react";
import { Head } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Box, Grid } from "@mui/material";
import PageBox from "@/Components/pagebox/PageBox";

export default function Profile({ auth, seller }) {
    console.log(seller);
    return (
        <NavigationLayout user={auth.user}>
            
            <Head title="Painel vendedor - Perfil" />

            <Box noValidate sx={{ width: "100%", py: 2 }}>
                <Grid container spacing={0} rowSpacing={2}>
                    <Grid item xs={12}>
                        <PageBox
                            title="Suas informações"
                            subTitle="Veja suas informações como vendedor"
                        ></PageBox>
                    </Grid>

                    {/* <Grid item xs={12}>
                        <PageBox
                            title="Meus anúncios"
                            subTitle="Veja e administre seus anúncios"
                        ></PageBox>
                    </Grid> */}
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
