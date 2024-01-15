import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";

const BenefitLine = ({ label }) => {
    return (
        <Typography
            sx={{
                fontSize: 14,
                color: "var(--dark-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
            }}
        >
            <CheckIcon sx={{ color: "var(--success-color)" }} />
            &nbsp;
            {label}
        </Typography>
    );
};

function OfferCard({ name, description, price, benefits, processing }) {
    return (
        <Card sx={{ width: "300px", margin: "0 auto", maxHeight: "auto" }}>
            <CardContent sx={{ p: 0 }}>
                <Box
                    noValidate
                    sx={{
                        backgroundColor: "var(--secondary-color)",
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            color: "var(--white-color)",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography>{description}</Typography>
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                        R$ {price}
                    </Typography>
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography>Benefícios:</Typography>
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Stack direction="column" spacing={2}>
                        {benefits?.map((benefit, index) => (
                            <BenefitLine key={index} label={benefit} />
                        ))}
                    </Stack>
                </Box>

                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={processing}
                        disableElevation
                        fullWidth
                        sx={{ marginY: 1.5 }}
                    >
                        Comprar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default OfferCard;
