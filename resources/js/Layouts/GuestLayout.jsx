import React from "react";
import Box from "@mui/system/Box";
import Logo from "@/Components/Logo";

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
            <Box component="a" href="/" sx={{ mb: 2 }}>
                <Logo height="48px" width="48px" />
            </Box>

            <div>{children}</div>
        </Box>
    );
}
