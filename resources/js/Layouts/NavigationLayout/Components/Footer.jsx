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

    const mostSearched = [
        {
            label: "Anúncios com UP",
            href: "/",
            disabled: false,
        },
        {
            label: "Conselhos para Anúncios Eficazes",
            href: "/dicas-anuncio",
            disabled: false,
        },
        {
            label: "Evitando Fraudes no WhatsApp",
            href: "/golpes-whatsapp",
            disabled: false,
        },
    ];

    const usefulLinks = [
        {
            label: "Ajuda Rápida",
            href: "/ajuda-rapida",
            disabled: false,
        },
        {
            label: "Privacidade e Segurança",
            href: "/privacidade-seguranca",
            disabled: false,
        },
        {
            label: "Tutorial de como fazer seus Anúncios",
            href: "/tutorial-anuncios",
            disabled: false,
        },
        {
            label: "Proteção contra Golpes",
            href: "/protecao-golpes",
            disabled: false,
        },
    ];

    const mainCategories = [
        {
            label: "Suporte ao Cliente",
            href: "/suporte",
            disabled: false,
        },
        {
            label: "Iniciar um Anúncio",
            href: "/iniciar-anuncio",
            disabled: false,
        },
        {
            label: "Dicas de Marketing",
            href: "/dicas-marketing",
            disabled: false,
        },
        {
            label: "Alerta de Golpes",
            href: "/alerta-golpes",
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
                                <Tab label="Pesquisas populares" />
                                <Tab label="Links úteis" />
                                <Tab label="Categorias principais" />
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
                                        {mostSearched.map((ms, index) => (
                                            <MenuItem
                                                key={index}
                                                onClick={ () => router.visit(ms.href)}
                                                disabled={ms.disabled}
                                                sx={{
                                                    color: "var(--dark-color)",
                                                    fontSize: 14,
                                                }}
                                            >
                                                {ms.label}
                                            </MenuItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                            {tabContent === 1 && (
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
                                                onClick={ () => router.visit(ul.href)}
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
                            {tabContent === 2 && (
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
                                        {mainCategories.map((mc, index) => (
                                            <MenuItem
                                                variant="text"
                                                key={index}
                                                onClick={ () => router.visit(mc.href)}
                                                disabled={mc.disabled}
                                                sx={{
                                                    color: "var(--dark-color)",
                                                    fontSize: 14,
                                                }}
                                            >
                                                {mc.label}
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
