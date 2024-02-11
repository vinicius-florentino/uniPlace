import { Head, useForm } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Box, Grid, TextField, Button } from "@mui/material";
import PageBox from "@/Components/pagebox/PageBox";
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState } from "react";
import Switch from '@mui/material/Switch';
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";

export default function Profile({ auth, seller }) {

    const { post, errors } = useForm({
        name: "",
    });

    const [NameUser, setNameUser] = useState('');
    const [sellerChoice, setSellerChoice] = useState('0');

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

    const handleSwitchChange = (event) => {
        const isSwitchOn = event.target.checked;
        setSellerChoice(isSwitchOn ? 'true' : 'false');
        if (isSwitchOn) {
            setNameUser(auth.user.name || '');
        } else {
            setNameUser('');
        }
    };
    const handleChange = (event) => {
        const { value } = event.target;
        setNameUser(value);
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Painel vendedor - Perfil" />
            <Box noValidate sx={{ width: "100%", pt: 2 }}>
                <Grid container spacing={0} rowSpacing={2}>
                    {!seller &&
                        <Grid item xs={12}>
                            <PageBox
                                title="Você precisa virar vendedor para ver suas informações"
                                subTitle="Deseja usar seu nome de usuário como nome de vendedor?"
                            >
                                <Box component="form" onSubmit={onSubmit} noValidate>
                                    <Grid container spacing={0} rowGap={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Nome de vendedor"
                                                variant="outlined"
                                                value={NameUser}
                                                onChange={handleChange}
                                                error={errors.name}
                                                helperText={errors.name}
                                                fullWidth
                                                disabled={sellerChoice === 'true'}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} />

                                        <Grid item xs={12} md={6}>
                                            <FormControlLabel control={<Switch />} onChange={handleSwitchChange} label="Usar nome de usuário como nome de vendedor" />
                                        </Grid>
                                        <Grid item xs={12} md={6} />

                                        <Grid item md={12}>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                disableElevation
                                            >
                                                Confirmar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </PageBox>
                        </Grid>
                    }
                    {seller &&
                        <Grid item xs={12}>
                            <PageBox
                                title="Suas informações"
                                subTitle="Veja suas informações como vendedor"
                            ></PageBox>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <PageBoxRedirect
                            title="Suas informações"
                            subTitle="Veja suas informações como vendedor"
                            href="/"
                        >
                        </PageBoxRedirect>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
