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
    Slider,
    Tooltip,
    Typography
} from "@mui/material";

import AdsCategoriesSelect from "@/Components/selects/AdsCategoriesSelect";

const UpAdDialog = ({
    id,
    title,
    price,
    description,
    imageUrl,
    categoryId,
    availableCount,
}) => {
    const { data, setData, processing, errors } = useForm({
        title: title,
        description: description,
        price: price,
        image: "",
        category_id: categoryId,
        ups: 1,
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

    const handleSliderChange = (e, value, activeThumb) => {
        setData("ups", value);
    };

    const editAd = (e) => {
        e.preventDefault();

        router.put(
            `/seller-dashboard/ads/${id}/up`,
            {
                ups: data.ups,
            },
            {
                onSuccess: () => {
                    toast.success("Anúncio impulsionado com sucesso!");
                    onClose();
                },
                onError: () => {
                    toast.error("Ocorreu um erro!");
                },
            }
        );
    };

    return (
        <>
            <Tooltip title="Impulsionar" arrow placement="top">
                <IconButton onClick={handleOpen} disabled={availableCount < 1} sx={{color: "var(--primary-color)"}}>
                    <RemixIcon
                        className="ri-arrow-up-circle-line"
                    />
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
                    <DialogTitle>Impulsionar anúncio</DialogTitle>
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        id="track-false-range-slider"
                                        gutterBottom
                                    >
                                        Quantidade de UP's
                                    </Typography>
                                    <Slider
                                        aria-label="Always visible"
                                        value={data.ups}
                                        min={1}
                                        max={availableCount}
                                        onChange={handleSliderChange}
                                        step={1}
                                        valueLabelDisplay="auto"
                                        marks
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

export default UpAdDialog;
