// import ApplicationLogo from '@/Components/ApplicationLogo';
import React from "react";
import Box from "@mui/system/Box";

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
            <div>{children}</div>
        </Box>
    );
}
