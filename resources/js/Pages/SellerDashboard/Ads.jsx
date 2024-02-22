import React, { useState } from "react";
import { toast } from "react-toastify";
import { Head, useForm, router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";

import PageBox from "@/Components/pagebox/PageBox";
import Loading from "@/Components/Loading";
import PriceFormatMask from "@/Components/masks/PriceFormatMask";
import formatPrice from "@/Utils/formatPrice";

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
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const DeleteAdDialog = ({ id, title, price, description }) => {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        title: title,
        description: description,
        price: price,
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

    const editAd = (e) => {
        e.preventDefault();

        destroy(`/seller-dashboard/ads/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Anúncio excluido com sucesso!");
                onClose();
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <RemixIcon className="ri-delete-bin-line" color="var(--danger-color)"/>
            </IconButton>

            {open && (
                <Dialog onClose={onClose} open={open}>
                    <DialogTitle>Excluir anúncio</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 16, top: 12 }}
                    >
                        <RemixIcon className="ri-close-line" />
                    </IconButton>
                    <DialogContent dividers>
                        <Box noValidate component="form" onSubmit={editAd}>
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
                                        Excluir
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

const EditAdDialog = ({ id, title, price, description }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: title,
        description: description,
        price: price,
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

    const editAd = (e) => {
        e.preventDefault();

        put(`/seller-dashboard/ads/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Anúncio editado com sucesso!");
                onClose();
            },
            onError: () => {
                toast.error("Ocorreu um erro!");
            },
        });
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <RemixIcon className="ri-edit-line"/>
            </IconButton>

            {open && (
                <Dialog onClose={onClose} open={open}>
                    <DialogTitle>Editar anúncio</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 16, top: 12 }}
                    >
                        <RemixIcon className="ri-close-line" />
                    </IconButton>
                    <DialogContent dividers>
                        <Box noValidate component="form" onSubmit={editAd}>
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
            )}
        </>
    );
};

const CreateAdDialog = ({ onClose, open }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        price: "",
    });

    const createAd = (e) => {
        e.preventDefault();

        post("/seller-dashboard/ads", {
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
                <RemixIcon className="ri-close-line" />
            </IconButton>
            <DialogContent dividers>
                <Box noValidate component="form" onSubmit={createAd}>
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

    let paginationTotal = ads?.last_page;
    let actualPage = ads?.current_page;

    const [loading, setLoading] = useState(false);

    const [openCreateAdDialog, setOpenCreateAdDialog] = useState(false);

    const handleOpenCreateAdDialog = () => {
        setOpenCreateAdDialog(true);
    };

    const handleCloseCreateAdDialog = () => {
        setOpenCreateAdDialog(false);
    };

    const handlePaginationChange = (e, page) => {
        setLoading(true);
        router.visit("/seller-dashboard/ads", {
            data: { page },
            onFinish: () => setLoading(false),
        });
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
                            {loading && <Loading />}
                            {!loading && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="containedLight"
                                            onClick={() =>
                                                handleOpenCreateAdDialog()
                                            }
                                        >
                                            <RemixIcon className="ri-add-line" />
                                            Criar anúncio
                                        </Button>

                                        {openCreateAdDialog && (
                                            <CreateAdDialog
                                                open={openCreateAdDialog}
                                                onClose={
                                                    handleCloseCreateAdDialog
                                                }
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TableContainer component={Paper}>
                                            <Table
                                                sx={{ width: "100%" }}
                                                aria-label="simple table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Título
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Descrição
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Preço
                                                        </TableCell>
                                                        <TableCell align="right"></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {ads.data.map(
                                                        (ad, index) => (
                                                            <TableRow
                                                                key={index}
                                                                sx={{
                                                                    "&:last-child td, &:last-child th":
                                                                        {
                                                                            border: 0,
                                                                        },
                                                                }}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    {ad.title}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {
                                                                        ad.description
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {formatPrice(
                                                                        ad.price
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <EditAdDialog
                                                                        id={
                                                                            ad.id
                                                                        }
                                                                        title={
                                                                            ad.title
                                                                        }
                                                                        price={
                                                                            ad.price
                                                                        }
                                                                        description={
                                                                            ad.description
                                                                        }
                                                                    />
                                                                    <DeleteAdDialog
                                                                        id={
                                                                            ad.id
                                                                        }
                                                                        title={
                                                                            ad.title
                                                                        }
                                                                        price={
                                                                            ad.price
                                                                        }
                                                                        description={
                                                                            ad.description
                                                                        }
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Pagination
                                            color="primary"
                                            page={actualPage}
                                            count={paginationTotal}
                                            onChange={handlePaginationChange}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </PageBox>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
