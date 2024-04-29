import React, { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import {
    Box,
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    IconButton,
} from "@mui/material";
import PageBox from "@/Components/pagebox/PageBox";
import PageBoxRedirect from "@/Components/pagebox/PageBoxRedirect";
import RemixIcon from "@/Components/RemixIcon";

const UpdateProfileInformationForm = ({ user }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const onSubmit = (e) => {
        e.preventDefault();
        patch("/settings/user", {
            preserveScroll: true,
            onSuccess: () => toast.success("Alteração de dados concluída!"),
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
        <>
            <Box
                sx={{ width: "100%" }}
                noValidate
                component="form"
                onSubmit={onSubmit}
            >
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            name="name"
                            label="Nome"
                            variant="outlined"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                            helperText={errors.name}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
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
                            sx={{
                                width: { xs: "100%", md: "auto" },
                            }}
                        >
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

const UpdatePasswordForm = () => {
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
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <Box onSubmit={updatePassword} noValidate component="form">
            <Grid container spacing={0} rowGap={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={processing}
                        disableElevation
                        sx={{
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        Atualizar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

const DeleteUserDialog = ({ onClose, open }) => {
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

    const deleteUser = (e) => {
        e.preventDefault();

        destroy("/settings/user", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Alteração de dados concluída!");
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
            onSubmit={deleteUser}
        >
            <DialogTitle>Excluir conta</DialogTitle>
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
                                Depois que sua conta for excluída, todos os seus
                                recursos e dados serão excluídos
                                permanentemente. Por favor digite sua senha para
                                confirmar que deseja excluir permanentemente sua
                                conta.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
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
                    Excluir conta
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DeleteUserForm = () => {
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);

    const handleOpenDeleteUserDialog = () => {
        setOpenDeleteUserDialog(true);
    };

    const handleCloseDeleteUserDialog = () => {
        setOpenDeleteUserDialog(false);
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
                onClick={handleOpenDeleteUserDialog}
            >
                Excluir conta
            </Button>

            {openDeleteUserDialog && (
                <DeleteUserDialog
                    open={openDeleteUserDialog}
                    onClose={handleCloseDeleteUserDialog}
                />
            )}
        </>
    );
};

export const UserProfileSettings = ({ user }) => {
    return (
        <Box noValidate sx={{ width: "100%" }}>
            <Grid container spacing={0} rowSpacing={2}>
                <Grid item xs={12}>
                    <PageBox
                        title="Informações do perfil"
                        subTitle="Atualize as informações de perfil e endereço de email da sua conta"
                    >
                        <UpdateProfileInformationForm user={user} />
                    </PageBox>
                </Grid>

                <Grid item xs={12}>
                    <PageBox
                        title="Atualize sua senha"
                        subTitle="Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura."
                    >
                        <UpdatePasswordForm />
                    </PageBox>
                </Grid>
                <Grid item xs={12}>
                    <PageBox
                        title="Excluir conta"
                        subTitle="Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes
                        excluir sua conta, baixe quaisquer dados ou informações que você deseja reter."
                    >
                        <DeleteUserForm />
                    </PageBox>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfileSettings;
