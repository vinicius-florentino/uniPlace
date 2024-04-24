import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const PageBox = ({
    prependTitleIcon,
    title,
    subTitle,
    children,
    disablePaddingX,
    disablePaddingY,
}) => {
    return (
        <Box
            noValidate
            sx={{
                py: disablePaddingY ? 0 : 4,
                px: disablePaddingX ? 0 : 4,
                boxShadow: "var(--box-shadow)",
                // borderRadius: "16px",
                backgroundColor: "var(--white-color)",
            }}
        >
            {title && (
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        gap: "8px",
                    }}
                >
                    {prependTitleIcon}
                    {title}
                </Typography>
            )}
            {subTitle && (
                <Typography sx={{ fontWeight: 300 }}>{subTitle}</Typography>
            )}

            <Box sx={{ mt: title || subTitle ? 3 : 0 }}>{children}</Box>
        </Box>
    );
};

export default PageBox;
