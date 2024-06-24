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
import AccordionActions from "@mui/material/AccordionActions"
export default function Help({ auth }) {

    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Termos de Privacidade" />
            <Box
                noValidate
                sx={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 3
                }}
            >
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel1'}
                        onChange={handleAccordionChange('panel1')}
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
                                    1 Como criar uma conta?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography paragraph>
                                        Para criar uma conta, siga os seguintes passos:
                                    </Typography>
                                    <ul>
                                         <Typography component="li">1 Abra o aplicativo e clique em “Cadastrar”.</Typography>
                                        <Typography component="li">2 Insira seu nome, e-mail, instituição (caso seja aluno) e crie uma senha.</Typography>
                                        <Typography component="li">3 Clique em “Cadastrar” e verifique seu e-mail para confirmar a criação da conta.</Typography>
                                    </ul>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel2'}
                        onChange={handleAccordionChange('panel2')}
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
                                    2 Como faço para comprar um produto?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography paragraph>
                                    O aplicativo UniPlace não realiza nenhum tipo de transação na compra de produtos, apenas é realizado o anúncio do próprio e intermédio entre comprador e vendedor.
                                    </Typography>
                                    <ul>
                                        <Typography component="li">1 Navegue pelo aplicativo e encontre o produto desejado.</Typography>
                                        <Typography component="li">2 Clique no produto para ver mais detalhes.</Typography>
                                        <Typography component="li"> 
                                        3 Para entrar em contato com o vendendo responsável pela pública clique em “Inicie uma conversa via chat” e será redirecionado para uma conversa pelo Chat do sistema com o vendedor ou pelo aplicatibo WhatsApp.
                                        </Typography>
                                    </ul>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel3'}
                        onChange={handleAccordionChange('panel3')}
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
                                    3 Como me tornar um vendedor?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography paragraph>
                                        Passo a passo
                                    </Typography>
                                    <ul>
                                        <Typography component="li">1 Clique no ícone do seu perfil, no canto direito da tela.</Typography>
                                        <Typography component="li">2 Clique em “Configurações”.</Typography>
                                        <Typography component="li">3 Escolha o nome a ser utilizado na sua conta de vendedor, se necessário adicione um número de telefone para contato via WhatsApp.</Typography>
                                        <Typography component="li">4 Clique em “Salvar” e sua conta tipo vendedor já estará disponível para uso.</Typography>
                                    </ul>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel4'}
                        onChange={handleAccordionChange('panel4')}
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
                                    4 Como vender um produto?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography paragraph>
                                        Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto nas seguintes circunstâncias:
                                    </Typography>
                                    <ul>
                                        <Typography component="li">Para cumprir com a lei, regulamentos ou solicitações legais.</Typography>
                                        <Typography component="li">Para proteger nossos direitos, privacidade, segurança ou propriedade.</Typography>
                                    </ul>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel5'}
                        onChange={handleAccordionChange('panel5')}
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
                                    <Typography paragraph>
                                        Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através das informações de contato fornecidas no aplicativo.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel6'}
                        onChange={handleAccordionChange('panel6')}
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
                                    {/* <RemixIcon className="ri-filter-3-line" /> */}
                                    6. Seus Direitos
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography paragraph>
                                        Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através das informações de contato fornecidas no aplicativo.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel7'}
                        onChange={handleAccordionChange('panel7')}
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
                                    <Typography paragraph>
                                        Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre quaisquer alterações significativas através do aplicativo ou por e-mail.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box sx={{ my: 1, width: '100%' }}>
                    <Accordion
                        sx={{ px: 2, py: 2 }}
                        expanded={expanded === 'panel8'}
                        onChange={handleAccordionChange('panel8')}
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
                                    <Typography paragraph>
                                        Se você tiver alguma dúvida ou preocupação sobre esta política de privacidade, entre em contato conosco através do e-mail uni.placepi@gmail.com.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </NavigationLayout>
    );
}
