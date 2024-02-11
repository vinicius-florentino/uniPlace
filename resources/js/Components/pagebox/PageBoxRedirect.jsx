import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
const PageBoxRedirect = ({ title, subTitle, href }) => {
    return (
        <Box 
            component={"a"}
            href={href}
            noValidate
            sx={{
                p: 3,
                boxShadow: "var(--box-shadow)",
                borderRadius: "16px",
                backgroundColor: "var(--white-color)",
                display: "flex",
                minHeight: "48px",
                justifyContent: "space-between",
                alignItems: "center",
                color: "var(--dark-color)",
                textDecoration: "none"
            }}
        >
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                {title}
            </Typography>
            {/* <Typography sx={{ fontWeight: 300 }}>
                            {subTitle}
                        </Typography> */}
            <OpenInNewOutlinedIcon />
        </Box>
    );
};

export default PageBoxRedirect;
