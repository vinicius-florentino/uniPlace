import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
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
        put(`/settings/seller/${seller.id}`, {
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={processing}
                        sx={{
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
        name: userName,
        phone: "",
    });
    const [sellerNameFromUser, setSellerNameFromUser] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        post("/settings/seller", {
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Switch />}
                        checked={sellerNameFromUser}
                        onChange={handleSwitchChange}
                        label="Usar nome de usuário como nome de vendedor"
                    />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        type="submit"
                        disableElevation
                        disabled={processing}
                        sx={{
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

export default function SellerProfileSettings({ user }) {
    return (
        <Box noValidate sx={{ width: "100%" }}>
            <Grid container spacing={0} rowSpacing={2}>
                {!user.seller && (
                    <Grid item xs={12}>
                        <PageBox
                            title="Você precisa virar vendedor para ver suas informações"
                            subTitle="Preencha os campos para virar um vendedor"
                        >
                            <NotSellerProfileForm userName={user.name} />
                        </PageBox>
                    </Grid>
                )}

                {user.seller && (
                    <>
                        <Grid item xs={12}>
                            <PageBoxRedirect
                                title="Meu perfil de vendedor"
                                href={`/seller/${user.seller.id}`}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PageBoxRedirect
                                title="Gerenciar meus anúncios"
                                href="/seller-dashboard/ads"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PageBox
                                title="Informações do perfil de vendedor"
                                subTitle="Atualize as informações de perfil de vendedor"
                            >
                                <SellerProfileForm seller={user.seller} />
                            </PageBox>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
}
