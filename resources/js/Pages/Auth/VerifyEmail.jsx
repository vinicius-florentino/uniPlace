import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function VerifyEmail({ status }) {
    
    const { post, processing } = useForm({});

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("verification.send"), {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"), {
            onSuccess: () => {
                toast.success("Saída realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Verificação de email" />
            <Box
                noValidate
                component="form"
                sx={{ width: "100%" }}
                onSubmit={onSubmit}
            >
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12}>
                        <Typography>
                            Um novo link de verificação foi enviado para o
                            endereço de e-mail que você forneceu durante o
                            registro.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    ></Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={processing}
                            disableElevation
                            fullWidth
                        >
                            Reenviar email de verificação
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Button
                            variant="containedLight"
                            type="submit"
                            disabled={processing}
                            sx={{ backgroundColor: "inherit", color: "var(--dark-color)", border: "var(--borders)" }}
                            onClick={handleLogout}
                            disableElevation
                            fullWidth
                        >
                            Sair
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}
