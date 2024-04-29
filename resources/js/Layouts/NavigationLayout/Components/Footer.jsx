import React from "react";
import PersonalMenu from "./PersonalMenu";
import {
    Typography,
    Box,
    Grid,
    Button,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Alert,
    AppBar,
    Container,
    Toolbar,
    Divider,
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Footer({ user }) {
    const PesquisasPopulares = [
        {
            label: "Anúncios com UP",
            href: "/",
            disabled: false
        },
        {
            label: "Conselhos para Anúncios Eficazes",
            href: "/dicas-anuncio",
            disabled: false
        },
        {
            label: "Evitando Fraudes no WhatsApp",
            href: "/golpes-whatsapp",
            disabled: false
        },
    ];
    const LinksUteis = [
        {
            label: "Ajuda Rápida",
            href: "/ajuda-rapida",
            disabled: false
        },
        {
            label: "Privacidade e Segurança",
            href: "/privacidade-seguranca",
            disabled: false
        },
        {
            label: "Tutorial de como fazer seus Anúncios",
            href: "/tutorial-anuncios",
            disabled: false
        },
        {
            label: "Proteção contra Golpes",
            href: "/protecao-golpes",
            disabled: false
        },
    ];
    const CategoriasPrincipais = [
        {
            label: "Suporte ao Cliente",
            href: "/suporte",
            disabled: false
        },
        {
            label: "Iniciar um Anúncio",
            href: "/iniciar-anuncio",
            disabled: false
        },
        {
            label: "Dicas de Marketing",
            href: "/dicas-marketing",
            disabled: false
        },
        {
            label: "Alerta de Golpes",
            href: "/alerta-golpes",
            disabled: false
        },
    ];

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                                    >
                                        <Button
                                            variant="text"
                                            key={index}
                                            href={pp.href}
                                            disabled={pp.disabled}
                                            sx={{
                                                color: "var(--dark-color)",
                                                fontSize: 12
                                            }}
                                        >
                                            {pp.label}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </List>
                        </Box>
                    </CustomTabPanel>
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
                                    >
                                        <Button
                                            variant="text"
                                            key={index}
                                            href={lu.href}
                                            disabled={lu.disabled}
                                            sx={{
                                                color: "var(--dark-color)",
                                                fontSize: 12
                                            }}
                                        >
                                            {lu.label}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </List>
                        </Box>
                    </CustomTabPanel>
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
                                    >
                                        <Button
                                            variant="text"
                                            key={index}
                                            href={cp.href}
                                            disabled={cp.disabled}
                                            sx={{
                                                color: "var(--dark-color)",
                                                fontSize: 12
                                            }}
                                        >
                                            {cp.label}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </List>
                        </Box>
                    </CustomTabPanel>
                </Grid>
                <Grid>
                    <Grid container spacing={2}>
                        <Grid item md={3} />
                        <Grid item md={6} xs={12}>
                            <Typography sx={{ textAlign: "center" }}>&copy; 2024 Uniplace Todos os direitos reservados.</Typography>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <RemixIcon className="ri-instagram-line" fontSize={"24px"} />
                                </Grid>
                                <Grid item xs={2}>
                                    <RemixIcon className="ri-whatsapp-line" fontSize={"24px"} />
                                </Grid>
                                <Grid item xs={2}>
                                    <RemixIcon className="ri-twitter-x-line" fontSize={"24px"} />
                                </Grid>
                                <Grid item xs={2}>
                                    <RemixIcon className="ri-linkedin-line" fontSize={"24px"} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>
        </Container>
    </Box >
    </>
}
