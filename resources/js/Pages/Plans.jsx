import React from "react";
import { Head } from "@inertiajs/react";
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
    );
}
