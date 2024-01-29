import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

import Stack from "@mui/material/Stack";
import OfferCard from "@/Components/cards/OfferCard";

export default function Plans({ status, plans }) {
    return (
        <GuestLayout customWidth={"auto"}>
            <Head title="Planos" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
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
        </GuestLayout>
    );
}
