import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import RemixIcon from "../RemixIcon";
import Link from "@mui/material/Link";
import { router } from "@inertiajs/react";

const PageBoxRedirect = ({ title, to }) => {
    return (
        <Box
            component={Link}
            onClick={() => router.visit(to)}
            noValidate
            sx={{
                p: 4,
                boxShadow: "var(--box-shadow)",
                backgroundColor: "var(--white-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "var(--dark-color)",
                textDecoration: "none",
                "&:hover": {
                    backgroundColor: "var(--hover-color)",
                    textDecoration: "none",
                },
            }}
        >
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                {title}
            </Typography>
            <RemixIcon className="ri-external-link-line" />
        </Box>
    );
};

export default PageBoxRedirect;
