import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

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

        destroy("/profile", {
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
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Excluir conta</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: "absolute", right: 16, top: 12 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Box noValidate component="form" onSubmit={deleteUser}>
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

                        <Grid
                            item
                            xs={12}
                            display={"flex"}
                            justifyContent={"end"}
                            alignItems={"center"}
                            gap={"5px"}
                        >
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
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default function DeleteUserForm() {

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
}
