import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";

const BenefitLine = ({ label }) => {
    return (
        <Typography
            sx={{
                fontSize: 14,
                color: "var(--dark-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "5px"
            }}
        >
            <RemixIcon className="ri-check-line" color="var(--success-color)"/>
            <span>{label}</span>
        </Typography>
    );
};

function OfferCard({ name, description, price, benefits, processing }) {
    return (
        <Card sx={{ width: "250px", maxHeight: "auto" }}>
            <CardContent sx={{ p: 0 }}>
                <Box
                    noValidate
                    sx={{
                        backgroundColor: "var(--primary-color)",
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
                        p: 2
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
                        {formatPrice(price)}
                    </Typography>
                </Box>
                <Divider sx={{
                    mx: "10px"
                }} />
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography>Benefícios:</Typography>
                </Box>

                <Box>
                    <List>
                        {benefits?.map((benefit, index) => (
                            <React.Fragment key={index}>
                                {index > 0}
                                <ListItem disablePadding>
                                    <ListItemButton sx={{cursor: "default"}}>
                                        <BenefitLine label={benefit} />
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
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
