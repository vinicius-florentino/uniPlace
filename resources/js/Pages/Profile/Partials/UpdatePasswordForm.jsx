import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

export default function UpdatePasswordForm({}) {

    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Alteração de dados concluída!");
                reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }

                toast.error("Ocorreu um erro!");
            },
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(name, value);
    }

    return (
        <Box onSubmit={updatePassword} noValidate component="form">
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="current_password"
                        name="current_password"
                        label="Senha atual"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        error={!!errors.current_password}
                        helperText={errors.current_password}
                    />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="password"
                        name="password"
                        label="Nova senha"
                        ref={passwordInput}
                        value={data.password}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="password_confirmation"
                        name="password_confirmation"
                        label="Confirme a senha"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation}
                    />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={processing}
                        disableElevation
                        sx={{
                            mb: "10px",
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Atualizar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
