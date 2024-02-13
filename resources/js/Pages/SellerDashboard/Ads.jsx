import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import {
    Box,
    Grid,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PageBox from "@/Components/pagebox/PageBox";
import { toast } from "react-toastify";
import PriceFormatMask from "@/Components/masks/PriceFormatMask";

const CreateAdDialog = ({ onClose, open }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        title: "",
        description: "",
        price: "",
    });

    const deleteUser = (e) => {
        e.preventDefault();

        post('/seller-dashboard/ads', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Anúncio criado com sucesso!");
                onClose();
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Criar anúncio</DialogTitle>
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
                            <TextField
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
                                variant="contained"
                                disableElevation
                                disabled={processing}
                                type="submit"
                            >
                                Confirmar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default function Ads({ auth, ads }) {
    const [openCreateAdDialog, setOpenCreateAdDialog] = useState(false);

    const handleOpenCreateAdDialog = () => {
        setOpenCreateAdDialog(true);
    };

    const handleCloseCreateAdDialog = () => {
        setOpenCreateAdDialog(false);
    };

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Painel vendedor - Anúncios" />

            <Box noValidate sx={{ width: "100%", py: 2 }}>
                <Grid container spacing={0} rowSpacing={2}>
                    <Grid item xs={12}>
                        <PageBox
                            title="Meus anúncios"
                            subTitle="Veja seus anúncios como vendedor"
                        >
                            <div>
                                <button
                                    onClick={() => handleOpenCreateAdDialog()}
                                >
                                    Criar anúncio
                                </button>
                            </div>

                            {openCreateAdDialog && (
                                <CreateAdDialog
                                    open={openCreateAdDialog}
                                    onClose={handleCloseCreateAdDialog}
                                />
                            )}
                            {ads.data.map((ad, index) => (
                                <div key={index}>{JSON.stringify(ad)} <a href={`/seller-dashboard/ad/${ad.id}`}>Edit</a></div> 
                            ))}
                        </PageBox>
                    </Grid>

                    {/* <Grid item xs={12}>
                        <PageBox
                            title="Meus anúncios"
                            subTitle="Veja e administre seus anúncios"
                        ></PageBox>
                    </Grid> */}
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
