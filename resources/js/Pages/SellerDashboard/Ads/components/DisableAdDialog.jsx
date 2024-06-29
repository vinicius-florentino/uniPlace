import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "@inertiajs/react";
import PriceFormatMask from "@/Components/masks/PriceFormatMask";
import RemixIcon from "@/Components/RemixIcon";
import Image from "@/Components/Image";

import {
    Box,
    Grid,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    DialogActions,
    Tooltip,
} from "@mui/material";

import AdsCategoriesSelect from "@/Components/selects/AdsCategoriesSelect";

const DisableAdDialog = ({
    id,
    title,
    price,
    description,
    imageUrl,
    categoryId,
}) => {
    const {
        data,
        // setData,
        put,
        processing,
        // errors,
    } = useForm({
        title: title,
        description: description,
        price: price,
        category_id: categoryId,
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClose = () => {
        handleClose();
    };

    const disableAd = (e) => {
        e.preventDefault();

        put(`/seller-dashboard/ads/${id}/disable`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Anúncio desabilitado com sucesso!");
                onClose();
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <>
            <Tooltip title="Desabilitar" placement="top" arrow>
                <IconButton onClick={handleOpen}>
                    <RemixIcon
                        className="ri-prohibited-line"
                        color="var(--danger-color)"
                    />
                </IconButton>
            </Tooltip>
            {open && (
                <Dialog
                    onClose={onClose}
                    open={open}
                    component="form"
                    onSubmit={disableAd}
                    noValidate
                >
                    <DialogTitle>Desabilitar anúncio</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 16, top: 12 }}
                    >
                        <RemixIcon className="ri-close-line" />
                    </IconButton>
                    <DialogContent dividers>
                        <Box noValidate>
                            <Grid container spacing={0} rowSpacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap={"8px"}
                                >
                                    <Image
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            borderRadius: "300px",
                                            opacity: "50%",
                                        }}
                                        src={imageUrl}
                                    ></Image>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        id="title"
                                        type="text"
                                        name="title"
                                        label="Título"
                                        value={data.title}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        id="description"
                                        name="description"
                                        type="text"
                                        label="Descrição"
                                        value={data.description}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        id="price"
                                        name="price"
                                        label="Preço"
                                        type="text"
                                        value={data.price}
                                        InputProps={{
                                            inputComponent: PriceFormatMask,
                                        }}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AdsCategoriesSelect
                                        id="category_id"
                                        name="category_id"
                                        label="Categoria de anúncio"
                                        value={data.category_id || ""}
                                        fullWidth
                                        disabled
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
                            Desabilitar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default DisableAdDialog;
