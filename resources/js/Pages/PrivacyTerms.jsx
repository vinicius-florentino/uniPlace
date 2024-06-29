import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavigationLayout from "@/Layouts/NavigationLayout";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import RemixIcon from "@/Components/RemixIcon";
import PageBoxInherit from "@/Components/pagebox/PageBoxInherit";

export default function PrivacyTerms({ auth }) {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <NavigationLayout user={auth.user} disablePadding>
            <Head title="Termos de Privacidade" />
            <PageBoxInherit
                prependTitleIcon={
                    <RemixIcon className="ri-article-line" />
                }
                title="Termos de privacidade"
                subTitle="Aqui você encontra nossos termos e condições de uso"
            >
                <Box
                    noValidate
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel1"}
                            onChange={handleAccordionChange("panel1")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        1. Introdução
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Bem-vindo à UniPlace. Valorizamos a
                                            sua privacidade e estamos
                                            comprometidos em proteger suas
                                            informações pessoais. Este documento
                                            de Termos de Privacidade explica
                                            como coletamos, usamos,
                                            compartilhamos e protegemos seus
                                            dados.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel2"}
                            onChange={handleAccordionChange("panel2")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        2. Coleta de Informações
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Ao utilizar nosso aplicativo,
                                            coletamos as seguintes
                                            informações pessoais:
                                        </Typography>
                                        <Typography component="li">
                                            Dados de Contato: Nome, endereço
                                            de e-mail, número de telefone e
                                            instituição de ensino (se for
                                            estudante).
                                        </Typography>
                                        <Typography component="li">
                                            Informações de Navegação: Dados
                                            de acesso e informações sobre
                                            como você usa nosso aplicativo.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel3"}
                            onChange={handleAccordionChange("panel3")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        3. Uso das Informações
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            As informações coletadas são
                                            usadas para:
                                        </Typography>
                                        <Typography component="li">
                                            Facilitar a comunicação entre
                                            compradores e vendedores.
                                        </Typography>
                                        <Typography component="li">
                                            Fornecer suporte ao cliente.
                                        </Typography>
                                        <Typography component="li">
                                            Personalizar sua experiência no
                                            aplicativo.
                                        </Typography>
                                        <Typography component="li">
                                            Enviar atualizações, ofertas
                                            promocionais e outras
                                            informações relevantes.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel4"}
                            onChange={handleAccordionChange("panel4")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        4. Compartilhamento de Informações
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Não vendemos, trocamos ou
                                            transferimos suas informações
                                            pessoais para terceiros, exceto
                                            nas seguintes circunstâncias:
                                        </Typography>
                                        <Typography component="li">
                                            Para cumprir com a lei,
                                            regulamentos ou solicitações
                                            legais.
                                        </Typography>
                                        <Typography component="li">
                                            Para proteger nossos direitos,
                                            privacidade, segurança ou
                                            propriedade.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel5"}
                            onChange={handleAccordionChange("panel5")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        5. Segurança das Informações
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Você tem o direito de acessar,
                                            corrigir ou excluir suas informações
                                            pessoais. Para exercer esses
                                            direitos, entre em contato conosco
                                            através das informações de contato
                                            fornecidas no aplicativo.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel6"}
                            onChange={handleAccordionChange("panel6")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        6. Seus Direitos
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Você tem o direito de acessar,
                                            corrigir ou excluir suas informações
                                            pessoais. Para exercer esses
                                            direitos, entre em contato conosco
                                            através das informações de contato
                                            fornecidas no aplicativo.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel7"}
                            onChange={handleAccordionChange("panel7")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        7. Alterações nos Termos de Privacidade
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Podemos atualizar esta política de
                                            privacidade periodicamente.
                                            Notificaremos você sobre quaisquer
                                            alterações significativas através do
                                            aplicativo ou por e-mail.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{ my: 1, width: "100%" }}>
                        <Accordion
                            sx={{ px: 2, py: 2 }}
                            expanded={expanded === "panel8"}
                            onChange={handleAccordionChange("panel8")}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <RemixIcon className="ri-arrow-down-s-line" />
                                }
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Box sx={{ width: "100%" }}>
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
                                        8. Contato
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="li">
                                            Se você tiver alguma dúvida ou
                                            preocupação sobre esta política de
                                            privacidade, entre em contato
                                            conosco através do e-mail
                                            uni.placepi@gmail.com.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Box>
            </PageBoxInherit>
        </NavigationLayout>
    );
}
