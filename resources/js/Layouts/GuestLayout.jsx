// import ApplicationLogo from '@/Components/ApplicationLogo';
import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

export default function Guest({ children, customWidth }) {
    return (
        <Box
            component="section"
            sx={{
                minHeight: "80vh",
                width: customWidth ?? "550px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            {/* <Typography
                noWrap
                sx={{
                    m: 0,
                    fontWeight: 300,
                    fontSize: 32,
                    letterSpacing: ".2rem",
                    color: "var(--dark-color)",
                    textDecoration: "none",
                }}
            >
                Uniplace
            </Typography>

            <Typography
                noWrap
                sx={{
                    mb: 2,
                    fontWeight: 300,
                    fontSize: 20,
                    letterSpacing: ".2rem",
                    color: "var(--dark-color)",
                    textDecoration: "none",
                }}
            >
                Marketplace universitário
            </Typography> */}

            <div>{children}</div>
        </Box>
    );
}
