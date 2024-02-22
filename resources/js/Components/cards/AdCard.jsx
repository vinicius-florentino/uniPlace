import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Brigadeiro from "../../Assets/brigadeiro.webp";
import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";

export default function AdCard({ title, sellerName, price, href }) {
    return (
        <Card sx={{ width: "250px", maxHeight: "auto", borderRadius: "16px" }}>
            {/* colocar link quando tiver pagina de ad */}
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
                    <img
                        style={{
                            width: "100%",
                            height: "170px",
                            objectFit: "cover",
                        }}
                        src={Brigadeiro}
                        alt="Brigadeiro"
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
