import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm, router } from "@inertiajs/react";
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
    FormHelperText,
    Tooltip,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import AdsCategoriesSelect from "@/Components/selects/AdsCategoriesSelect";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const EditAdDialog = ({
    id,
    title,
    price,
    description,
    imageUrl,
    categoryId,
}) => {
    const { data, setData, put, processing, errors } = useForm({
        title: title,
        description: description,
        price: price,
        image: "",
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setData(name, files[0] || "");
    };

    const handleRemoveImageClick = (e) => {
        setData("image", "");
    };

    const editAd = (e) => {
        e.preventDefault();

        router.post(
            `/seller-dashboard/ads/${id}`,
            {
                _method: "put",
                title: data.title,
                description: data.description,
                price: data.price,
                image: data.image,
                category_id: data.category_id,
            },
            {
                onSuccess: () => {
                    toast.success("Anúncio editado com sucesso!");
                    onClose();
                },
                onError: () => {
                    toast.error("Ocorreu um erro!");
                },
            }
        );
    };

    const handleDeleteImage = (e) => {
        e.preventDefault();

        put(`/seller-dashboard/ads/${id}/delete-image`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Imagem excluída com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <>
            <Tooltip title="Editar" arrow placement="top">
                <IconButton onClick={handleOpen}>
                    <RemixIcon className="ri-edit-line" />
                </IconButton>
            </Tooltip>
            {open && (
                <Dialog
                    onClose={onClose}
                    open={open}
                    component="form"
                    onSubmit={editAd}
                    noValidate
                >
                    <DialogTitle>Editar anúncio</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 16, top: 12 }}
                    >
                        <RemixIcon className="ri-close-line" />
                    </IconButton>
                    <DialogContent dividers>
                        <Box noValidate sx={{ width: "100%" }}>
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
                                        }}
                                        src={imageUrl}
                                    ></Image>
                                    <Button
                                        variant="containedDanger"
                                        disableElevation
                                        disabled={!imageUrl}
                                        onClick={handleDeleteImage}
                                    >
                                        Remover imagem atual
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="title"
                                        type="text"
                                        name="title"
                                        label="Título"
                                        value={data.title}
                                        error={!!errors.title}
                                        helperText={errors.title}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="description"
                                        name="description"
                                        type="text"
                                        label="Descrição"
                                        value={data.description}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="price"
                                        name="price"
                                        label="Preço"
                                        type="text"
                                        value={data.price}
                                        error={!!errors.price}
                                        helperText={errors.price}
                                        onChange={handleChange}
                                        InputProps={{
                                            inputComponent: PriceFormatMask,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AdsCategoriesSelect
                                        id="category_id"
                                        name="category_id"
                                        label="Categoria de anúncio"
                                        onChange={handleChange}
                                        value={data.category_id || ""}
                                        error={!!errors.category_id}
                                        helperText={errors.category_id}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    display={"flex"}
                                    alignItems="center"
                                    justifyContent="start"
                                    gap="8px"
                                >
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="containedLight"
                                        tabIndex={-1}
                                        startIcon={
                                            <RemixIcon className="ri-file-image-line" />
                                        }
                                    >
                                        {data.image.name
                                            ? `(${data?.image?.name?.slice(
                                                  0,
                                                  14
                                              )}... selecionado)`
                                            : "Escolher nova imagem"}
                                        <VisuallyHiddenInput
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                    {data.image.name && (
                                        <IconButton
                                            onClick={handleRemoveImageClick}
                                        >
                                            <RemixIcon className="ri-close-line"></RemixIcon>
                                        </IconButton>
                                    )}
                                    <FormHelperText error={!!errors.image}>
                                        {errors.image ?? null}
                                    </FormHelperText>
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
                            variant="contained"
                            disableElevation
                            disabled={processing}
                            type="submit"
                        >
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default EditAdDialog;
