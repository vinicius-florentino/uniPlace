import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Brigadeiro from "../../Assets/brigadeiro.webp"
import formatPrice from "@/Utils/formatPrice";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

export default function AdCard({ title, sellerName, price, href }) {
    return (
        <Card sx={{ width: "100%", maxHeight: "auto", borderRadius: "16px" }} >
            {/* colocar link quando tiver pagina de ad */}
            <CardContent sx={{ p: 0 }}>
                <Box sx={{
                    m: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <img style={{
                        maxWidth: "230px", minWidth: "200px", maxHeight: "230px", minHeight: "200px", borderRadius: "16px"
                    }} src={Brigadeiro} alt="Brigadeiro" />
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
                            gap: "5px"
                        }}
                    >
                        <AssignmentIndOutlinedIcon />
                        {sellerName}
                    </Typography>
                </Box>
                <Box>
                </Box>
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
};