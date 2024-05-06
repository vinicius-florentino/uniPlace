import React from "react";
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
import RemixIcon from "@/Components/RemixIcon";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Footer({ user }) {

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const PesquisasPopulares = [
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
    const LinksUteis = [
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
    const CategoriasPrincipais = [
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

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const iconesSociais = ["ri-instagram-line", "ri-whatsapp-line", "ri-twitter-x-line", "ri-linkedin-line"];

    const Icone = ({ className }) => (
        <Grid item xs={3} sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
            <RemixIcon className={className} fontSize={"24px"} />
        </Grid>
    );

    return <>
        <Box sx={{ backgroundColor: ("var(--white-color)"), paddingBottom: "20px" }}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Pesquisas populares " {...a11yProps(0)} />
                                <Tab label="Links úteis" {...a11yProps(1)} />
                                <Tab label="Categorias principais" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {value === 0 &&
                        <CustomTabPanel value={value} index={0}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    justifyContent: "start",
                                }}
                            >
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    aria-label="contacts"
                                >
                                    {PesquisasPopulares.map((pp, index) => (
                                        <MenuItem disablePadding
                                            variant="text"
                                            key={index}
                                            href={pp.href}
                                            disabled={pp.disabled}
                                            sx={{
                                                color: "var(--dark-color)",
                                                fontSize: 14
                                            }}
                                        >
                                            {pp.label}
                                        </MenuItem>
                                    ))}
                                </List>
                            </Box>
                        </CustomTabPanel>
                    }
                    {value === 1 &&
                        <CustomTabPanel value={value} index={1}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    justifyContent: "start",
                                }}
                            >
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    aria-label="contacts"
                                >
                                    {LinksUteis.map((lu, index) => (
                                        <MenuItem disablePadding
                                            variant="text"
                                            key={index}
                                            href={lu.href}
                                            disabled={lu.disabled}
                                            sx={{
                                                color: "var(--dark-color)",
                                                fontSize: 14
                                            }}
                                        >
                                            {lu.label}
                                        </MenuItem>
                                    ))}
                                </List>
                            </Box>
                        </CustomTabPanel>
                    }
                    {value === 2 &&
                        <CustomTabPanel value={value} index={2}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    justifyContent: "start",
                                }}
                            >
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    aria-label="contacts"
                                >
                                    {CategoriasPrincipais.map((cp, index) => (
                                        <MenuItem disablePadding
                                            variant="text"
                                            key={index}
                                            href={cp.href}
                                            disabled={cp.disabled}
                                            sx={{
                                                color: "var(--dark-color)",
                                                fontSize: 14
                                            }}
                                        >
                                            {cp.label}
                                        </MenuItem>
                                    ))}
                                </List>
                            </Box>
                        </CustomTabPanel>
                    }
                </Grid>
                <Grid>
                    <Grid container spacing={2}>
                        <Grid item md={3} />
                        <Grid item md={6} xs={12}>
                            <Typography sx={{ textAlign: "center" }}>&copy; 2024 Uniplace Todos os direitos reservados.</Typography>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Grid container spacing={2}>
                                {iconesSociais.map(className => <Icone key={className} className={className} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    </>
}
