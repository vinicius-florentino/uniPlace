import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { Box, Grid, TextField } from '@mui/material';

export default function ConfirmPassword() {
    
    const { 
    data, 
    setData, 
    post, 
    processing, 
    errors, 
    reset 
    } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("confirm-password"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Alteração de dados concluída!");
                reset();
            },
            onError: () => {
                if (errors.password) {
                    reset("password");
                }
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
            <Head title="Confirmar senha"/>
            <Grid sx={{
                mb: "20px",
                width: "100%"
            }}>
                Esta é uma área segura do aplicativo. Por favor, confirme sua senha antes de continuar.
            </Grid>
            <Box onSubmit={submit} noValidate component="form">
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12} md={12}>
                    <TextField
                            id="password"
                            name="confirm_password"
                            label="Senha atual"
                            value={data.password}
                            onChange={handleChange}
                            type="password"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}
