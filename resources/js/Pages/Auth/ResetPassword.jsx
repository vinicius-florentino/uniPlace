import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Grid, Button, TextField } from '@mui/material';

export default function ResetPassword({ token, email }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onSuccess: () => {
                toast.success("Senha atualizada!");
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
            <Head title="Resetar a senha"/>
            <Box onSubmit={onSubmit} noValidate component="form">
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            label="Email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            label="Senha"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password}    
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            fullWidth
                            label="Confirmação da senha"
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}    
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
                            Resetar senha
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}
