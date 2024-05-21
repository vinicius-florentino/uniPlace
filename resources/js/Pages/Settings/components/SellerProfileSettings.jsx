import React, { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    FormControl,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    Typography,
    DialogActions,
} from "@mui/material";
import PageBox from "@/Components/pagebox/PageBox";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import RemixIcon from "@/Components/RemixIcon";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="+00 (00) 00000-0000"
            definitions={{
                "#": /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) =>
                onChange({ target: { name: props.name, value } })
            }
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const SellerProfileForm = ({ seller, handleSellerChange }) => {
    const { data, setData, processing, put, errors } = useForm({
        name: seller.name || "",
        phone: seller.phone || "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
        if (handleSellerChange) {
            handleSellerChange(event);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        put(`/settings/seller`, {
            preserveScroll: true,
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
                        required
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
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="phone"
                            name="phone"
                            label="Número de celular"
                            variant="outlined"
                            value={data.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                                inputComponent: TextMaskCustom,
                            }}
                        />
                    </FormControl>
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
            preserveScroll: true,
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

    return (
        <Box component="form" onSubmit={onSubmit} noValidate>
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12}>
                    <TextField
                        required
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
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            id="phone"
                            name="phone"
                            label="Número de celular"
                            variant="outlined"
                            value={data.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                                inputComponent: TextMaskCustom,
                            }}
                        />
                    </FormControl>
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

const DeleteSellerDialog = ({ onClose, open }) => {
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteSeller = (e) => {
        e.preventDefault();

        destroy("/settings/seller", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Exclusão de perfil de vendedor concluída.");
                onClose();
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
                passwordInput.current.focus();
            },
            onFinish: () => reset(),
        });
    };

    return (
        <Dialog
            onClose={onClose}
            open={open}
            component="form"
            onSubmit={deleteSeller}
        >
            <DialogTitle>Excluir perfil de vendedor</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: "absolute", right: 16, top: 12 }}
            >
                <RemixIcon className="ri-close-line" />
            </IconButton>
            <DialogContent dividers>
                <Box noValidate>
                    <Grid container spacing={0} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                Depois que seu perfil de vendedor for excluído,
                                todos os seus anúncios e dados referentes serão excluídos
                                permanentemente. Por favor digite sua senha para
                                confirmar que deseja excluir permanentemente seu perfil de vendas.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                variant="outlined"
                                id="password"
                                type="password"
                                name="password"
                                label="Senha"
                                ref={passwordInput}
                                value={data.password}
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="containedLight"
                    disableElevation
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    variant="containedDanger"
                    disableElevation
                    disabled={processing}
                    type="submit"
                >
                    Excluir perfil de vendedor
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DeleteSellerForm = () => {
    const [openDeleteSellerDialog, setOpenDeleteSellerDialog] = useState(false);

    const handleOpenDeleteSellerDialog = () => {
        setOpenDeleteSellerDialog(true);
    };

    const handleCloseDeleteSellerDialog = () => {
        setOpenDeleteSellerDialog(false);
    };

    return (
        <>
            <Button
                variant="containedDanger"
                type="submit"
                disableElevation
                sx={{
                    width: { xs: "100%", md: "auto" },
                }}
                onClick={handleOpenDeleteSellerDialog}
            >
                Excluir perfil de vendedor
            </Button>

            {openDeleteSellerDialog && (
                <DeleteSellerDialog
                    open={openDeleteSellerDialog}
                    onClose={handleCloseDeleteSellerDialog}
                />
            )}
        </>
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
                            <PageBox
                                title="Informações do perfil de vendedor"
                                subTitle="Atualize as informações de perfil de vendedor"
                            >
                                <SellerProfileForm seller={user.seller} />
                            </PageBox>
                        </Grid>
                        <Grid item xs={12}>
                            <PageBox
                                title="Excluir perfil de vendedor"
                                subTitle="Depois que seu perfil de vendedor for excluído, todos os seus recursos e dados serão excluídos permanentemente. Antes
                                excluir sua conta, baixe quaisquer dados ou informações que você deseja reter."
                            >
                                <DeleteSellerForm />
                            </PageBox>
                        </Grid>
                        <Grid item xs={12}>
                            <PageBoxRedirect
                                title="Gerenciar meus anúncios"
                                to="/seller-dashboard/ads"
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
}
