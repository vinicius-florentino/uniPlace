import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, router } from "@inertiajs/react";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { toast } from "react-toastify";

export default function ForgotPassword({ status }) {
    
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("password.email"), {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
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
                            Esqueceu sua senha? Sem problemas. Basta nos
                            informar seu endereço de e-mail e enviaremos por
                            e-mail link de redefinição.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            helperText={errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={processing}
                            disableElevation
                            fullWidth
                        >
                            Confirmar
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Link onClick={() => router.visit("/login")}>Fazer login</Link>
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}
