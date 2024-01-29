import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const PageBox = ({ title, subTitle, children }) => {
    return (
        <Box
            noValidate
            sx={{
                minwidth: "100%",
                maxwidth: "100%",
                p: 3,
                boxShadow: "var(--box-shadow)",
                borderRadius: "16px",
                backgroundColor: "var(--white-color)",
            }}
        >
            <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
            <Typography sx={{ fontWeight: 300, fontSize: 14 }}>
                {subTitle}
            </Typography>

            <Box sx={{ mt: 3 }}>{children}</Box>
        </Box>
    );
};

export default PageBox;
