import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";
import Image from "../Image";
import { CardActionArea } from "@mui/material";
import { router } from "@inertiajs/react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import formatDateTime from "@/Utils/formatDateTime";

export default function AdCard({
    title,
    sellerName,
    imageSrc,
    price,
    to,
    promotedUntil,
}) {
    return (
        <Card sx={{ width: "auto", maxHeight: "auto", borderRadius: "16px" }}>
            <CardActionArea onClick={() => router.visit(to)}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ width: "100%", pb: 2 }}>
                        <Grid container spacing={0} rowSpacing={1}>
                            <Grid item xs={12} sx={{ position: "relative" }}>
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "170px",
                                        objectFit: "fill",
                                    }}
                                    src={imageSrc}
                                />
                                {promotedUntil && (
                                    <Tooltip
                                        title={`Promovido até ${formatDateTime(
                                            promotedUntil
                                        )}`}
                                        arrow
                                    >
                                        <Chip
                                            sx={{
                                                position: "absolute",
                                                top: 20,
                                                left: 10,
                                                backgroundColor:
                                                    "var(--primary-color)",
                                                color: "var(--white-color)",
                                                fontSize: 12,
                                                fontWeight: 500,
                                            }}
                                            size="small"
                                            variant="filled"
                                            label="UP"
                                            icon={
                                                <RemixIcon
                                                    className="ri-arrow-up-circle-line"
                                                    color="var(--white-color)"
                                                />
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </Grid>
                            <Grid item xs={12} sx={{ px: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        color: "var(--dark-color)",
                                        fontWeight: 500,
                                    }}
                                    noWrap={true}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ px: 2 }}>
                                <Typography
                                    sx={{ fontSize: 16, fontWeight: 700 }}
                                >
                                    {formatPrice(price)}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    px: 2,
                                    alignItems: "center",
                                    display: "flex",
                                    gap: "8px",
                                }}
                            >
                                {sellerName && (
                                    <>
                                        <RemixIcon
                                            className={"ri-user-2-line"}
                                            fontSize={"14px"}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                color: "var(--dark-color)",
                                            }}
                                            noWrap={true}
                                        >
                                            {sellerName}
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
