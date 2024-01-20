import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Grid>
            <Grid sx={{
                my: "10px"
            }}>
                <Typography>Atualize sua senha</Typography>
                <Typography>
                    Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura.
                </Typography>
            </Grid>

            <Box onSubmit={updatePassword} noValidate component="form">
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="current_password"
                            name="current_password"
                            label="Senha atual"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            fullWidth
                        />
                        <InputError message={errors.current_password} className="mt-2" />
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="password"
                            name="password"
                            label="Nova senha"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            fullWidth
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Confirme a senha"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            fullWidth
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
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
        </Grid>
    );
}
