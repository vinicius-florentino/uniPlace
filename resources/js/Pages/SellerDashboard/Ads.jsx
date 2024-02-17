import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
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
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Menu,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PageBox from "@/Components/pagebox/PageBox";
import { toast } from "react-toastify";
import PriceFormatMask from "@/Components/masks/PriceFormatMask";
import formatPrice from "@/Utils/formatPrice";
import Loading from "@/Components/Loading";

const EditAdDialog = ({ onClose, open }) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Editar anúncio</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: "absolute", right: 16, top: 12 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Box noValidate component="form" >
                    <Grid container spacing={0} rowSpacing={2}>

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
                                // disabled={processing}
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
                <CloseIcon />
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
    const [openEditAdDialog, setOpenEditAdDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenCreateAdDialog = () => {
        setOpenCreateAdDialog(true);
    };

    const handleCloseCreateAdDialog = () => {
        setOpenCreateAdDialog(false);
    };

    const handleOpenEditAdDialog = () => {
        setOpenEditAdDialog(true);
    };

    const handleCloseEditAdDialog = () => {
        setOpenEditAdDialog(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                                            <AddOutlinedIcon />
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
                                                sx={{ minWidth: 650 }}
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
                                                                    {/* <Stack
                                                                        direction="row"
                                                                        justifyContent="end"
                                                                        alignItems="center"
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleOpenEditAdDialog()
                                                                            }
                                                                        >
                                                                            <EditOutlinedIcon />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            sx={{
                                                                                color: "var(--danger-color)",
                                                                            }}
                                                                        >
                                                                            <DeleteOutlineOutlinedIcon />
                                                                        </IconButton>
                                                                    </Stack> */}
                                                                    <IconButton
                                                                        aria-controls={
                                                                            open
                                                                                ? "basic-menu"
                                                                                : undefined
                                                                        }
                                                                        aria-haspopup="true"
                                                                        aria-expanded={
                                                                            open
                                                                                ? "true"
                                                                                : undefined
                                                                        }
                                                                        onClick={
                                                                            handleClick
                                                                        }
                                                                    >
                                                                        <MoreVertOutlinedIcon />
                                                                    </IconButton>
                                                                    <Menu
                                                                        id="basic-menu"
                                                                        anchorEl={
                                                                            anchorEl
                                                                        }
                                                                        open={
                                                                            open
                                                                        }
                                                                        onClose={
                                                                            handleClose
                                                                        }
                                                                        MenuListProps={{
                                                                            "aria-labelledby":
                                                                                "basic-button",
                                                                        }}
                                                                    >
                                                                        <MenuItem
                                                                            onClick={() =>
                                                                                handleOpenEditAdDialog()
                                                                            }
                                                                            disabled
                                                                        >
                                                                            Editar
                                                                        </MenuItem>
                                                                        {openEditAdDialog && (
                                                                            <EditAdDialog
                                                                            
                                                                                open={
                                                                                    openEditAdDialog
                                                                                }
                                                                                onClose={
                                                                                    handleCloseEditAdDialog
                                                                                }
                                                                            />
                                                                        )}
                                                                        <MenuItem
                                                                            onClick={
                                                                                handleClose
                                                                            }
                                                                            sx={{
                                                                                color: "var(--danger-color)",
                                                                            }}
                                                                            disabled
                                                                        >
                                                                            Excluir
                                                                        </MenuItem>
                                                                    </Menu>
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
                                            color="secondary"
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
