import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";

const BenefitLine = ({ label }) => {
    return (
        <Typography
            sx={{
                fontSize: 16,
                color: "var(--dark-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "8px",
            }}
        >
            <RemixIcon className="ri-check-line" color="var(--success-color)" fontSize={"24px"}/>
            <span>{label}</span>
        </Typography>
    );
};

function OfferCard({ name, description, price, benefits, processing }) {
    return (
        <Card
            sx={{
                width: "280px",
                maxHeight: "auto",
                boxShadow: "var(--box-shadow)",
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "var(--primary-color)",
                        }}
                    >
                        {name}
                    </Typography>
                    <hr />
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                        height: "120px",
                    }}
                >
                    <Typography sx={{ textAlign: "justify", fontWeight: 300 }}>
                        {description}
                    </Typography>
                </Box>
                {/* <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            color: "var(--dark-color)",
                        }}
                    >
                        Benefícios:
                    </Typography>
                </Box> */}

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    {benefits?.map((benefit, index) => (
                        <BenefitLine key={index} label={benefit} />
                    ))}
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 300,
                            textAlign: "start",
                        }}
                    >
                        {formatPrice(price)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        p: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={processing}
                        disableElevation
                        fullWidth
                    >
                        Assinar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default OfferCard;
