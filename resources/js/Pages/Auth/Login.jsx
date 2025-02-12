import React, { useEffect } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { toast } from "react-toastify";

export default function Login() {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setData(name, checked);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    return (
        <GuestLayout>
            <Head title="Entrar" />
            <Box noValidate component="form" onSubmit={onSubmit}>
                <Grid container spacing={0} rowGap={2}>
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
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Senha"
                            variant="outlined"
                            type={"password"}
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                            helperText={errors.password}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.remember}
                                    name="remember"
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label="Lembrar de mim"
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"end"}
                    >
                        <Link onClick={() => router.visit("/forgot-password")}>
                            Esqueci minha senha
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={processing}
                            disableElevation
                            fullWidth
                        >
                            Entrar
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Link onClick={() => router.visit("/register")}>Criar conta</Link>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Link onClick={() => router.visit("/")}>Página inicial</Link>
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}
