import React, { useState } from "react";
import { toast } from "react-toastify";
import { Head, useForm, router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";

import PageBox from "@/Components/pagebox/PageBox";
import Loading from "@/Components/Loading";
import PriceFormatMask from "@/Components/masks/PriceFormatMask";
import formatPrice from "@/Utils/formatPrice";

import formatDate from "@/Utils/formatDate";

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
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
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

const DeleteAdDialog = ({
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
        delete: destroy,
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

    const deleteAd = (e) => {
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
                <RemixIcon
                    className="ri-delete-bin-line"
                    color="var(--danger-color)"
                />
            </IconButton>

            {open && (
                <Dialog
                    onClose={onClose}
                    open={open}
                    component="form"
                    onSubmit={deleteAd}
                >
                    <DialogTitle>Excluir anúncio</DialogTitle>
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
                                        value={data.category_id}
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
                            Excluir
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

const EditAdDialog = ({ id, title, price, description, imageUrl, categoryId }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: title,
        description: description,
        price: price,
        image: "",
        category_id: categoryId
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
        setData(name, files[0]);
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
                category_id: data.category_id
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
            <IconButton onClick={handleOpen}>
                <RemixIcon className="ri-edit-line" />
            </IconButton>

            {open && (
                <Dialog
                    onClose={onClose}
                    open={open}
                    component="form"
                    onSubmit={editAd}
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
                                <Grid item xs={12} display={"flex"} alignItems="center" justifyContent="start" gap="8px">
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
                toast.error("Ocorreu um erro!");
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setData(name, files[0]);
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
                <Box noValidate>
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
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="start" gap="8px">
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
    );
};

export default function Ads({ auth, ads }) {
    // let paginationTotal = ads?.last_page;
    // let actualPage = ads?.current_page;

    const [loading, setLoading] = useState(false);

    const [openCreateAdDialog, setOpenCreateAdDialog] = useState(false);

    const handleOpenCreateAdDialog = () => {
        setOpenCreateAdDialog(true);
    };

    const handleCloseCreateAdDialog = () => {
        setOpenCreateAdDialog(false);
    };

    // const handlePaginationChange = (e, page) => {
    //     setLoading(true);
    //     router.visit("/seller-dashboard/ads", {
    //         data: { page },
    //         onFinish: () => setLoading(false),
    //     });
    // };

    return (
        <NavigationLayout user={auth.user}>
            <Head title="Painel vendedor - Anúncios" />

            <Box noValidate sx={{ width: "100%" }}>
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
                                            startIcon={
                                                <RemixIcon className="ri-add-line" />
                                            }
                                        >
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
                                        {ads.data.length === 0 && (
                                            <Alert severity="info">
                                                Nenhum anúncio foi encontrado
                                            </Alert>
                                        )}

                                        {ads.data.length > 0 && (
                                            <TableContainer component={Paper}>
                                                <Table
                                                    sx={{ width: "100%" }}
                                                    aria-label="simple table"
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">
                                                                Imagem
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Categoria
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Título
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Descrição
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Preço
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Data de criação
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Estado
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
                                                                        sx={{
                                                                            objectFit:
                                                                                "contain",
                                                                        }}
                                                                        align="center"
                                                                    >
                                                                        <Image
                                                                            src={
                                                                                ad.image_url
                                                                            }
                                                                            style={{
                                                                                width: "48px",
                                                                                height: "48px",
                                                                                borderRadius:
                                                                                    "300px",
                                                                            }}
                                                                            alt="Imagem do anúncio"
                                                                        ></Image>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {
                                                                            ad
                                                                                .category
                                                                                .name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {
                                                                            ad.title
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {
                                                                            ad.description
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {formatPrice(
                                                                            ad.price
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {formatDate(
                                                                            ad.created_at
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {ad.is_able
                                                                            ? "Ativo"
                                                                            : "Inativo"}
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <IconButton
                                                                            href={`/ad/${ad.id}`}
                                                                        >
                                                                            <RemixIcon className="ri-eye-line"></RemixIcon>
                                                                        </IconButton>
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
                                                                            imageUrl={
                                                                                ad.image_url
                                                                            }
                                                                            categoryId={
                                                                                ad.category_id
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
                                                                            imageUrl={
                                                                                ad.image_url
                                                                            }
                                                                            categoryId={
                                                                                ad.category_id
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    </Grid>
                                    {/* <Grid item xs={12}>
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
                                    </Grid> */}
                                </Grid>
                            )}
                        </PageBox>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
