import React, { useState } from "react";
import {
    Typography,
    Box,
    Grid,
    MenuItem,
    Container,
    List,
    Tabs,
    Tab,
} from "@mui/material";
import { router } from "@inertiajs/react";

export default function Footer() {
    const [tabContent, setTabContent] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabContent(newValue);
    };

    const usefulLinks = [
        {
            label: "Planos",
            to: "/plans",
            disabled: false,
        },
        {
            label: "Ajuda",
            to: "/help",
            disabled: false,
        },
        {
            label: "Termos de privacidade",
            to: "/privacy-terms",
            disabled: false,
        },
    ];

    return (
        <Box
            sx={{
                backgroundColor: "var(--white-color)",
                p: 4,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Tabs
                                value={tabContent}
                                onChange={handleTabChange}
                                aria-label="basic tabs example"
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <Tab label="Links úteis" />
                            </Tabs>
                        </Grid>

                        <Grid item xs={12}>
                            {tabContent === 0 && (
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        justifyContent: "start",
                                    }}
                                >
                                    <List
                                        sx={{
                                            width: "100%",
                                            backgroundColor:
                                                "var(--white-color)",
                                        }}
                                    >
                                        {usefulLinks.map((ul, index) => (
                                            <MenuItem
                                                variant="text"
                                                key={index}
                                                onClick={() =>
                                                    router.visit(ul.to)
                                                }
                                                disabled={ul.disabled}
                                                sx={{
                                                    color: "var(--dark-color)",
                                                    fontSize: 14,
                                                }}
                                            >
                                                {ul.label}
                                            </MenuItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ textAlign: "center" }}>
                                Uniplace | {new Date().getFullYear()} &copy;
                                Todos os direitos reservados
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
