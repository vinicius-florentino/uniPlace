import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import {
    Box,
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
} from "@mui/material";
import PageBox from "@/Components/pagebox/PageBox";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";
import { toast } from "react-toastify";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

const SellerProfileForm = ({ seller }) => {
    const { data, setData, processing, put, errors } = useForm({
        name: seller.name || "",
        phone: seller.phone || "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    const handlePhoneChange = (value, info) => {
        setData("phone", value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        put(`/seller-dashboard/profile/${seller.id}`, {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <Box component="form" onSubmit={onSubmit} noValidate>
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nome de vendedor"
                        variant="outlined"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}/>
                <Grid item xs={12} md={6}>
                    <MuiTelInput
                        value={data.phone}
                        onChange={handlePhoneChange}
                        name="phone"
                        fullWidth
                        label="Número de celular"
                        defaultCountry="BR"
                        onlyCountries={["BR"]}
                        disableFormatting
                        forceCallingCode
                        error={errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={processing}
                        sx={{
                            mb: "8px",
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

const NotSellerProfileForm = ({ userName }) => {
    const { data, setData, processing, post, errors } = useForm({
        name: "",
        phone: "",
    });
    const [sellerNameFromUser, setSellerNameFromUser] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        post("/seller-dashboard/profile", {
            onSuccess: () => {
                toast.success("Ação realizada com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    const handleSwitchChange = (event) => {
        const { checked } = event.target;
        setSellerNameFromUser(checked);
        if (checked) {
            setData("name", userName);
        } else {
            setData("name", "");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    const handlePhoneChange = (value, info) => {
        setData("phone", value);
    };

    return (
        <Box component="form" onSubmit={onSubmit} noValidate>
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nome de vendedor"
                        variant="outlined"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name}
                        fullWidth
                        disabled={sellerNameFromUser}
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        control={<Switch />}
                        value={sellerNameFromUser}
                        onChange={handleSwitchChange}
                        label="Usar nome de usuário como nome de vendedor"
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <MuiTelInput
                        value={data.phone}
                        onChange={handlePhoneChange}
                        name="phone"
                        fullWidth
                        label="Número de celular"
                        defaultCountry="BR"
                        onlyCountries={["BR"]}
                        disableFormatting
                        forceCallingCode
                        error={errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={processing}
                        sx={{
                            mb: "8px",
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default function Profile({ auth, seller }) {
    return (
        <NavigationLayout user={auth.user}>
            <Head title="Painel vendedor - Perfil" />
            <Box noValidate sx={{ width: "100%" }}>
                <Grid container spacing={0} rowSpacing={2}>
                    {!seller && (
                        <Grid item xs={12}>
                            <PageBox
                                title="Você precisa virar vendedor para ver suas informações"
                                subTitle="Preencha os campos para virar um vendedor"
                            >
                                <NotSellerProfileForm
                                    userName={auth.user.name}
                                />
                            </PageBox>
                        </Grid>
                    )}
                    {seller && (
                        <>
                            <Grid item xs={12}>
                                <PageBox
                                    title="Informações do perfil de vendedor"
                                    subTitle="Atualize as informações de perfil de vendedor"
                                >
                                    <SellerProfileForm seller={seller} />
                                </PageBox>
                            </Grid>
                            <Grid item xs={12}>
                                <PageBoxRedirect
                                    title="Meus anúncios"
                                    href="/seller-dashboard/ads"
                                ></PageBoxRedirect>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
