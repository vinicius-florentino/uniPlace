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
                                    <ul>
                                        <Typography component="li">Para criar uma conta, siga os seguintes passos:</Typography>
                                        <Typography component="li">Abra o aplicativo e clique em “Cadastrar”.</Typography>
                                        <Typography component="li">Insira seu nome, e-mail, instituição (caso seja aluno) e crie uma senha.</Typography>
                                        <Typography component="li">Clique em “Cadastrar” e verifique seu e-mail para confirmar a criação da conta.</Typography>
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
                                    <ul>
                                        <Typography component="li">
                                            O aplicativo UniPlace não realiza nenhum tipo de transação na compra de produtos, apenas é realizado o anúncio do próprio e intermédio entre comprador e vendedor.
                                        </Typography>
                                        <Typography component="li">Navegue pelo aplicativo e encontre o produto desejado.</Typography>
                                        <Typography component="li">Clique no produto para ver mais detalhes.</Typography>
                                        <Typography component="li">
                                            Para entrar em contato com o vendendo responsável pela pública clique em “Inicie uma conversa via chat” e será redirecionado para uma conversa pelo Chat do sistema com o vendedor ou pelo aplicatibo WhatsApp.
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
                                    <ul>
                                        <Typography component="li">Clique no ícone do seu perfil, no canto direito da tela.</Typography>
                                        <Typography component="li">Clique em “Configurações”.</Typography>
                                        <Typography component="li">Escolha o nome a ser utilizado na sua conta de vendedor, se necessário adicione um número de telefone para contato via WhatsApp.</Typography>
                                        <Typography component="li">Clique em “Salvar” e sua conta tipo vendedor já estará disponível para uso.</Typography>
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
                                    <ul>
                                        <Typography component="li">Clique o menu principal, no canto direito da tela.</Typography>
                                        <Typography component="li">Clique em “Trocar de conta”.</Typography>
                                        <Typography component="li">Clique em “Gerenciar anúncios” no menu principal.</Typography>
                                        <Typography component="li">Clique em “Criar anúncio”.</Typography>
                                        <Typography component="li">Preencha as informações sobre o produto, incluindo título, descrição, preço, tipo do produto e foto.</Typography>
                                        <Typography component="li">Clique em “Salvar” para publicar seu produto no sistema.</Typography>
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
                                    5. Como alterar minhas informações pessoais?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ul>
                                        <Typography component="li">
                                            Acesse “Configurações” no menu principal.
                                        </Typography>
                                        <Typography component="li">
                                            Edite as informações desejadas.
                                        </Typography>
                                        <Typography component="li">
                                            Verifique as modificações e cliquei em “Salvar”.
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
                                    6. O que fazer se esquecer minha senha?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ul>
                                        <Typography component="li">
                                            Na tela de login, clique em “Esqueci minha senha”.
                                        </Typography>
                                        <Typography component="li">
                                            Insira seu e-mail registrado.
                                        </Typography>
                                        <Typography component="li">
                                            Verifique seu e-mail e siga as instruções para redefinir sua senha.
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
                                    7. Como excluir minha de vendedor?
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ul>
                                        <Typography component="li">
                                            Acesse “Configurações” no menu principal.
                                        </Typography>
                                        <Typography component="li">
                                            Clique em “Excluir perfil de vendedor”.
                                        </Typography>
                                        <Typography component="li">
                                            Verifique a ação antes de confirmá-la..
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
                                    8. Problemas comuns e soluções rápidas
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ul>
                                        <Typography component="li">
                                            Não consigo fazer login: Verifique se está usando o e-mail e senha corretos. Se necessário, redefina sua senha.
                                        </Typography>
                                        <Typography component="li">
                                            Erro ao processar pagamento do plano: Verifique se todas as informações de pagamento estão corretas e se há saldo suficiente.
                                        </Typography>
                                        <Typography component="li">
                                            Se precisar de mais assistência, entre em contato conosco através das opções fornecidas na seção “Fale Conosco”.
                                        </Typography>
                                    </ul>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </NavigationLayout>
    );
}
