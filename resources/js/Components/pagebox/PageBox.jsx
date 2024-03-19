import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const PageBox = ({ title, subTitle, children }) => {
    return (
        <Box
            noValidate
            sx={{
                p: 4,
                boxShadow: "var(--box-shadow)",
                borderRadius: "16px",
                backgroundColor: "var(--white-color)",
            }}
        >
            {title && (
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                    {title}
                </Typography>
            )}
            {subTitle && (
                <Typography sx={{ fontWeight: 300 }}>
                    {subTitle}
                </Typography>
            )}

            <Box sx={{ mt: title || subTitle ? 3 : 0 }}>{children}</Box>
        </Box>
    );
};

export default PageBox;
