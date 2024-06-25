import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import dayjs from 'dayjs';
import NavigationLayout from "@/Layouts/NavigationLayout";
import PageBox from "@/Components/pagebox/PageBox";
import formatPrice from "@/Utils/formatPrice";
import formatDate from "@/Utils/formatDate";
import RemixIcon from "@/Components/RemixIcon";
import Image from "@/Components/Image";

import {
    Box,
    Grid,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    Tooltip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ToggleButton,
    ToggleButtonGroup,
    TextField
} from "@mui/material";
import QrCodeMensal from "../../../Assets/qrcode-pix-plano-mensal.png";
import ReenableAdDialog from "./components/ReenableAdDialog";
import CreateAdDialog from "./components/CreateAdDialog";
import EditAdDialog from "./components/EditAdDialog";
import DisableAdDialog from "./components/DisableAdDialog";
import DeleteAdDialog from "./components/DeleteAdDialog";
import UpAdDialog from "./components/UpAdDialog";

export default function Ads({ auth, ads }) {

    const { user } = auth;

    const [openCreateAdDialog, setOpenCreateAdDialog] = useState(false);

    const [openDialogBuyUp, setOpenDialogBuyUp] = useState(false);
    const [copied, setCopied] = useState(false);
    const [textTooltip, setTextTooltip] = useState("Copiar código");
    const [paymentMethod, setPaymentMethod] = useState("Pix");
    const [upPrice, setUpPrice] = useState(6.25);
    const [quantity, setQuantity] = useState(1);
    const [showQrCode, setShowQrCode] = useState(false);
    const textCodigo = "00020126360014BR.GOV.BCB.PIX0114+5512991875000520400005303986540539.905802BR5908Uniplace6006Lorena62070503***630466D8";

    const adsAble = ads.filter((ad) => ad.enabled);
    const adsUnable = ads.filter((ad) => !ad.enabled);


    const handleOpenBuyUp = () => {
        setOpenDialogBuyUp(true);
        setPaymentMethod("Pix");
    };

    const handleCloseBuyUp = () => {
        setOpenDialogBuyUp(false);
        setPaymentMethod(null);
        setCopied(false);
        setTextTooltip("Copiar código");
    };

    const handleOpenCreateAdDialog = () => {
        setOpenCreateAdDialog(true);
    };

    const handleCloseCreateAdDialog = () => {
        setOpenCreateAdDialog(false);
    };


    const handleQuantityChange = (event) => {
        let newQuantity = event.target.value;

        if (newQuantity < 0 || !Number.isInteger(Number(newQuantity))) {
            newQuantity = 1;
        }
        setQuantity(newQuantity);
        setUpPrice(6.25 * newQuantity);
    };

    const handlePaymentMethod = (event, newPaymentMethod) => {
        if (newPaymentMethod !== null) {
            setPaymentMethod(newPaymentMethod);
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(textCodigo).then(() => {
            setCopied(true);
            setTextTooltip("Código copiado");
        });
    };


    return (
        <NavigationLayout user={user}>
            <Head title="Painel vendedor - Anúncios" />

            <Box noValidate sx={{ width: "100%" }}>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid
                        item
                        xs={12}
                        md={6}
                        display="flex"
                        flexDirection="column"
                    >
                        <PageBox
                            prependTitleIcon={
                                <RemixIcon className="ri-dashboard-line" />
                            }
                            title="Gerenciar meus anúncios"
                            subTitle="Administre seus anúncios criados como vendedor"
                            sx={{ height: "100%" }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "start",
                                            gap: "8px",
                                        }}
                                    >
                                        <RemixIcon className="ri-price-tag-3-line" />
                                        Quantidade de anúncios criados: {ads.length} de {user.seller.plan.max_ads}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="containedLight"
                                        onClick={() =>
                                            handleOpenCreateAdDialog()
                                        }
                                        startIcon={
                                            <RemixIcon className="ri-add-line" />
                                        }
                                        sx={{
                                            width: { xs: "100%", md: "auto" },
                                        }}
                                    >
                                        Criar anúncio
                                    </Button>

                                    {openCreateAdDialog && (
                                        <CreateAdDialog
                                            open={openCreateAdDialog}
                                            onClose={handleCloseCreateAdDialog}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PageBox
                            prependTitleIcon={
                                <RemixIcon className="ri-arrow-up-circle-line" />
                            }
                            title="Impulsionar meus anúncios"
                            subTitle="Impulsione seus anúncios criados como vendedor"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "start",
                                            gap: "8px",
                                        }}
                                    >
                                        <RemixIcon className="ri-wallet-line" />
                                        Saldo de UP's disponíveis:{" "}
                                        {user.seller.up.available_count}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="containedLight"
                                        disableElevation
                                        startIcon={
                                            <RemixIcon className="ri-add-line" />
                                        }
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                md: "auto",
                                            },
                                        }}
                                        onClick={() => handleOpenBuyUp()}
                                    >
                                        Adquirir UP's
                                    </Button>
                                </Grid>
                                <Dialog
                                    open={openDialogBuyUp}
                                    onClose={handleCloseBuyUp}
                                >
                                    <DialogTitle>Comprar UP'S ({formatPrice(upPrice)})</DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleCloseBuyUp}
                                        sx={{ position: "absolute", right: 16, top: 12 }}
                                    >
                                        <RemixIcon className="ri-close-line" />
                                    </IconButton>
                                    <DialogContent dividers>
                                        <Box sx={{ width: "100%" }} noValidate>
                                            <Grid container spacing={0} rowSpacing={2}>
                                                <Grid item xs={12}>
                                                    <ToggleButtonGroup
                                                        value={paymentMethod}
                                                        exclusive
                                                        onChange={handlePaymentMethod}
                                                        fullWidth
                                                    >
                                                        <ToggleButton
                                                            value="Pix"
                                                            aria-label="Pix"
                                                        >
                                                            Pix
                                                        </ToggleButton>
                                                        <ToggleButton
                                                            value="Cartao"
                                                            aria-label="Cartão"
                                                            disabled
                                                        >
                                                            Cartão
                                                        </ToggleButton>
                                                    </ToggleButtonGroup>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        id="quantity"
                                                        type="number"
                                                        name="quantity"
                                                        label="Quantidade"
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                        fullWidth
                                                        inputProps={{ min: 1, step: 1 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                    }}
                                                    justifyContent="center"
                                                >
                                                    <Button
                                                        variant="contained"
                                                        disableElevation
                                                        onClick={() => setShowQrCode(true)}
                                                        disabled={quantity < 1}
                                                    >
                                                        Gerar QR Code
                                                    </Button>
                                                </Grid> 
                                                {paymentMethod === "Pix" && showQrCode && (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Image
                                                                src={QrCodeMensal}
                                                                alt={`QR Code for Up`}
                                                                style={{
                                                                    objectFit: "contain",
                                                                    width: "100%",
                                                                    height: "300px",
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            display="flex"
                                                            gap="8px"
                                                        >
                                                            <Tooltip title={textTooltip}>
                                                                <IconButton
                                                                    onClick={handleCopyToClipboard}
                                                                >
                                                                    <RemixIcon
                                                                        className={
                                                                            copied
                                                                                ? "ri-file-copy-fill"
                                                                                : "ri-file-copy-line"
                                                                        }
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <TextField
                                                                variant="outlined"
                                                                type="text"
                                                                label="Código copia e cola"
                                                                value={textCodigo}
                                                                fullWidth
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                    </>
                                                )}
                                            </Grid>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant="containedLight"
                                            disableElevation
                                            onClick={handleCloseBuyUp}
                                        >
                                            Cancelar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBox
                            prependTitleIcon={
                                <RemixIcon
                                    className="ri-arrow-up-double-line"
                                    color="var(--success-color)"
                                />
                            }
                            title={`Meus anúncios habilitados (${adsAble.length})`}
                            subTitle="Anúncios disponíveis para possíveis clientes"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {adsAble.length === 0 && (
                                        <Alert severity="info">
                                            Nenhum anúncio habilitado foi
                                            encontrado
                                        </Alert>
                                    )}

                                    {adsAble.length > 0 && (
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
                                                        <TableCell align="left">
                                                            Categoria
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Título
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Descrição
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Preço
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Data de criação
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Promovido até
                                                        </TableCell>
                                                        <TableCell align="right"></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {adsAble.map(
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
                                                                <TableCell align="left">
                                                                    {
                                                                        ad
                                                                            ?.category
                                                                            ?.name || "Sem categoria"
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="left">
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
                                                                <TableCell align="left">
                                                                    {formatDate(
                                                                        ad.created_at
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="left" sx={{ color: dayjs(ad?.up_usage?.expires_at) < dayjs() ? "red" : "" }}>
                                                                    {formatDate(
                                                                        ad?.up_usage?.expires_at
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Tooltip
                                                                        title="Visualizar"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                router.visit(
                                                                                    `/ad/${ad.id}`
                                                                                )
                                                                            }
                                                                        >
                                                                            <RemixIcon className="ri-eye-line"></RemixIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
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
                                                                            ad?.category_id
                                                                        }
                                                                    />
                                                                    <UpAdDialog
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
                                                                            ad?.category_id
                                                                        }
                                                                    availableCount={
                                                                        user
                                                                            .seller
                                                                            .up
                                                                            .available_count
                                                                    }
                                                                    />
                                                                    {ad.enabled && (
                                                                        <DisableAdDialog
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
                                                                                ad?.category_id
                                                                            }
                                                                        />
                                                                    )}
                                                                    {!ad.enabled && (
                                                                        <ReenableAdDialog
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
                                                                                ad?.category_id
                                                                            }
                                                                        />
                                                                    )}
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
                                                                            ad?.category_id
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
                            </Grid>
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBox
                            prependTitleIcon={
                                <RemixIcon
                                    className="ri-prohibited-line"
                                    color="var(--danger-color)"
                                />
                            }
                            title={`Meus anúncios desabilitados (${adsUnable.length})`}
                            subTitle="Anúncios não disponíveis para possíveis clientes"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {adsUnable.length === 0 && (
                                        <Alert severity="info">
                                            Nenhum anúncio desabilitado foi
                                            encontrado
                                        </Alert>
                                    )}

                                    {adsUnable.length > 0 && (
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
                                                        <TableCell align="left">
                                                            Categoria
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Título
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Descrição
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Preço
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Data de criação
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            Promovido até
                                                        </TableCell>
                                                        <TableCell align="right"></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {adsUnable.map(
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
                                                                <TableCell align="left">
                                                                    {
                                                                        ad
                                                                            ?.category
                                                                            ?.name || "Sem categoria"
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="left">
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
                                                                <TableCell align="left">
                                                                    {formatDate(
                                                                        ad.created_at
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="left" sx={{ color: dayjs(ad?.up_usage?.expires_at) < dayjs() ? "red" : "" }}>
                                                                    {formatDate(
                                                                        ad?.up_usage?.expires_at
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Tooltip
                                                                        title="Visualizar"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                router.visit(
                                                                                    `/ad/${ad.id}`
                                                                                )
                                                                            }
                                                                        >
                                                                            <RemixIcon className="ri-eye-line"></RemixIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
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
                                                                            ad?.category_id
                                                                        }
                                                                    />
                                                                    {ad.enabled && (
                                                                        <DisableAdDialog
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
                                                                                ad?.category_id
                                                                            }
                                                                        />
                                                                    )}
                                                                    {!ad.enabled && (
                                                                        <ReenableAdDialog
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
                                                                                ad?.category_id
                                                                            }
                                                                        />
                                                                    )}
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
                                                                            ad?.category_id
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
                            </Grid>
                        </PageBox>
                    </Grid>
                </Grid>
            </Box>
        </NavigationLayout>
    );
}
