import React from "react";
import { toast } from "react-toastify";
import { useForm } from "@inertiajs/react";
import PriceFormatMask from "@/Components/masks/PriceFormatMask";
import RemixIcon from "@/Components/RemixIcon";

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

const CreateAdDialog = ({ onClose, open }) => {

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        price: "",
        image: "",
        category_id: "",
    });

    const createAd = (e) => {
        e.preventDefault();

        post("/seller-dashboard/ads", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Anúncio criado com sucesso!");
                onClose();
            },
            onError: (errors) => {
                toast.error(errors?.message || "Ocorreu um erro!");
            },
        });
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

    return (
        <Dialog
            onClose={onClose}
            open={open}
            component="form"
            onSubmit={createAd}
            noValidate
        >
            <DialogTitle>Criar anúncio</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: "absolute", right: 16, top: 12 }}
            >
                <RemixIcon className="ri-close-line" />
            </IconButton>
            <DialogContent dividers>
                <Box noValidate sx={{width: "100%"}}>
                    <Grid container spacing={0} rowSpacing={2}>
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
                                value={data.category_id}
                                error={!!errors.category_id}
                                helperText={errors.category_id}
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display="flex"
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
                                    : "Escolher imagem"}
                                <VisuallyHiddenInput
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {data.image.name && (
                                <IconButton onClick={handleRemoveImageClick}>
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
    );
};

export default CreateAdDialog;