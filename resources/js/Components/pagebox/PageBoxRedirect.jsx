import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import RemixIcon from "../RemixIcon";

const PageBoxRedirect = ({ title, href }) => {
    return (
        <Box
            component={"a"}
            href={href}
            noValidate
            sx={{
                p: 4,
                boxShadow: "var(--box-shadow)",
                borderRadius: "16px",
                backgroundColor: "var(--white-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "var(--dark-color)",
                textDecoration: "none",
            }}
        >
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                {title}
            </Typography>
            {/* <Typography sx={{ fontWeight: 300 }}>
                            {subTitle}
                        </Typography> */}
            <RemixIcon className="ri-external-link-line" />
        </Box>
    );
};

export default PageBoxRedirect;
