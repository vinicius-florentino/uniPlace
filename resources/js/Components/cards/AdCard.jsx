import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";
import Image from "../Image";

export default function AdCard({ title, sellerName, imageSrc, price, href }) {
    return (
        <Card sx={{ width: "250px", maxHeight: "auto", borderRadius: "16px" }}>
            <CardContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        p: 0,
                        m: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{
                            width: "100%",
                            height: "170px",
                            objectFit: "cover",
                        }}
                        src={imageSrc}
                    />
                </Box>
                <Box
                    noValidate
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "var(--dark-color)",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        pl: 1.5,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "var(--dark-color)",
                            alignItems: "center",
                            display: "flex",
                            gap: "5px",
                        }}
                    >
                        <RemixIcon className={"ri-user-2-line"} />
                        {sellerName}
                    </Typography>
                </Box>
                <Box></Box>
                <Box
                    noValidate
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                        {formatPrice(price)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
