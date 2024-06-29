import React from "react";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OfferCard from "@/Components/cards/OfferCard";
import NavigationLayout from "@/Layouts/NavigationLayout";

import PageBoxInherit from "@/Components/pagebox/PageBoxInherit";
import RemixIcon from "@/Components/RemixIcon";

export default function Plans({ auth, plans }) {
    return (
        <NavigationLayout user={auth.user} disablePadding>
            <Head title="Planos" />
            <Box noValidate sx={{ width: "100%" }}>
                <PageBoxInherit
                    title="Planos"
                    subTitle="Aqui você encontra nossos planos para vendedores"
                    prependTitleIcon={<RemixIcon className="ri-award-line"/>}
                >
                    <Stack
                        direction="row"
                        spacing={5}
                        useFlexGap
                        flexWrap="wrap"
                        sx={{
                            justifyContent: "center",
                            alignItems: "top",
                        }}
                    >
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
                </PageBoxInherit>
            </Box>
        </NavigationLayout>
    );
}
