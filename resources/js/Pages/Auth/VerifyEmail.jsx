import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function VerifyEmail({ status }) {
    
    const { post, processing } = useForm({});

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Esqueci minha senha" />
            <Box
                noValidate
                component="form"
                sx={{ width: "100%" }}
                onSubmit={onSubmit}
            >
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12}>
                        <Typography>
                            Um novo link de verificação foi enviado para o endereço de e-mail
                            que você forneceu durante o registro.
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
                        <Link href={route("logout")} method="POST"> Sair </Link>
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}