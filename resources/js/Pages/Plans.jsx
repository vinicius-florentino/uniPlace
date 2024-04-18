import React from "react";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OfferCard from "@/Components/cards/OfferCard";
import NavigationLayout from "@/Layouts/NavigationLayout";

import PageBox from "@/Components/pagebox/PageBox";
import PageBoxInheritSection from "@/Components/pagebox/PageBoxInheritSection";
import { Typography } from "@mui/material";

export default function Plans({ auth, plans }) {
    return (
        <NavigationLayout user={auth.user}>
            <Head title="Planos" />
            <Box noValidate sx={{ width: "100%" }}>
                {/* <PageBoxInheritSection
                    title="Planos"
                    subTitle="Veja tudo sobre nossos planos de assinatura"
                >
                    <Typography>
                        It includes a comprehensive collection of prebuilt
                        components that are ready for use in production right
                        out of the box, and features a suite of customization
                        options that make it easy to implement your own custom
                        design system on top of our components.
                    </Typography>
                </PageBoxInheritSection> */}

                <PageBoxInheritSection>
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
                </PageBoxInheritSection>
            </Box>
        </NavigationLayout>
    );
}
