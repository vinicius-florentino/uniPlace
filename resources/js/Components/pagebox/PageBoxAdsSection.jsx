import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const PageBoxAdsSection = ({ title, subTitle, children }) => {
    return (
        <Box
            noValidate
            sx={{
                py: 4,
                px: 0.25,
                // boxShadow: "var(--box-shadow)",
                // borderRadius: "16px",
            }}
        >
            {title && (
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 20,
                    }}
                >
                    {title}
                </Typography>
            )}
            {subTitle && (
                <Typography sx={{ fontWeight: 300, fontSize: 16 }}>{subTitle}</Typography>
            )}

            <Box sx={{ mt: title || subTitle ? 3 : 0 }}>{children}</Box>
        </Box>
    );
};

export default PageBoxAdsSection;
