import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
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
