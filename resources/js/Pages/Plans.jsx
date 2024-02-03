import React from "react";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OfferCard from "@/Components/cards/OfferCard";
import NavigationLayout from "@/Layouts/NavigationLayout";
export default function Plans({ plans, auth }) {
    return (
        <NavigationLayout user={auth.user}>
            <Head title="Planos" />
            <Box noValidate sx={{ width: "100%", py: 2 }}>
                <Stack direction="row" spacing={5} useFlexGap flexWrap="wrap" sx={{
                    justifyContent: "center"
                }}>
                    {plans?.map((plan) => (
                        <OfferCard
                            key={plan.id}
                            name={plan.name}
                            price={plan.price}
                            description={plan.description}
                            benefits={plan.benefits}
                        />
                    ))}
                </Stack>
            </Box>
        </NavigationLayout>
    );
}
