import React from "react";
import { Head } from "@inertiajs/react";
<<<<<<< Updated upstream
import NavigationLayout from "@/Layouts/NavigationLayout";

import Stack from "@mui/material/Stack";
import OfferCard from "@/Components/cards/OfferCard";

export default function Plans({ auth, plans }) {
    return (
        <NavigationLayout user={auth.user}>
            <Head title="Planos" />

            <Stack direction="row" spacing={0} useFlexGap flexWrap="wrap">
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
        </NavigationLayout>
=======
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OfferCard from "@/Components/cards/OfferCard";
export default function Plans({ plans, auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
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
        </AuthenticatedLayout>
>>>>>>> Stashed changes
    );
}
