import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
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
