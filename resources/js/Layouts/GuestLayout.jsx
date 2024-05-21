import React from "react";
import Box from "@mui/system/Box";
import Logo from "@/Components/Logo";
import { router } from "@inertiajs/react";
import Link from "@mui/material/Link";

export default function Guest({ children }) {
    return (
        <Box
            component="section"
            sx={{
                // minHeight: "80vh",
                width: "320px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                my: 4,
                boxShadow: "var(--box-shadow)",
                backgroundColor: "var(--white-color)"
            }}
        >
            <Box component={Link} onClick={() => router.visit("/")} sx={{ mb: 2 }}>
                <Logo height="48px" width="48px" />
            </Box>

            <div>{children}</div>
        </Box>
    );
}
