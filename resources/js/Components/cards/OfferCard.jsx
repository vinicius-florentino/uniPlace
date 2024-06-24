import React from "react";
import { Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import formatPrice from "@/Utils/formatPrice";
import RemixIcon from "../RemixIcon";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import QrCodeMensal from "../../Assets/qrcode-pix-plano-mensal.png";
import QrCodeSemestral from "../../Assets/qrcode-pix-plano-semestral.png";
import Image from "@/Components/Image";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";

const BenefitLine = ({ label }) => {
    return (
        <Typography
            sx={{
                fontSize: 16,
                color: "var(--dark-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "8px",
            }}
        >
            <RemixIcon
                className="ri-check-line"
                color="var(--success-color)"
                fontSize={"24px"}
            />
            <span>{label}</span>
        </Typography>
    );
};

function OfferCard({ name, description, price, benefits, processing }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [textTooltip, setTextTooltip] = useState("Copiar código");
    const [paymentMethod, setPaymentMethod] = useState("Pix");
    const [textCodigoMensal] = useState(
        "00020126360014BR.GOV.BCB.PIX0114+5512991875000520400005303986540539.905802BR5908Uniplace6006Lorena62070503***630466D8"
    );
    const [textCodigoSemestral] = useState(
        "00020126360014BR.GOV.BCB.PIX0114+55129918750005204000053039865406203.495802BR5908Uniplace6006Lorena62070503***63049E7F"
    );

    const handleClickOpen = () => {
        setOpenDialog(true);
        setPaymentMethod("Pix");
    };

    const handleCloseDialogs = () => {
        setOpenDialog(false);
        setPaymentMethod(null);
        setCopied(false);
        setTextTooltip("Copiar código");
    };

    const handlePaymentMethod = (event, newPaymentMethod) => {
        if (newPaymentMethod !== null) {
            setPaymentMethod(newPaymentMethod);
        }
    };

    const handleCopyToClipboard = () => {
        const textToCopy =
            name === "Mensal" ? textCodigoMensal : textCodigoSemestral;

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTextTooltip("Código copiado");
        });
    };

    return (
        <Card
            sx={{
                width: "280px",
                maxHeight: "auto",
                boxShadow: "var(--box-shadow)",
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            textAlign: "start",
                            color: "var(--primary-color)",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 300,
                            textAlign: "start",
                        }}
                    >
                        {formatPrice(price)}
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        px: 2,
                        py: 1,
                        minHeight: "200px"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 300,
                            textAlign: "start",
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={processing || price === 0}
                        disableElevation
                        onClick={handleClickOpen}
                        fullWidth
                    >
                        Assinar
                    </Button>
                </Box>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialogs}
                >
                    <DialogTitle>Assinar plano {name} ({formatPrice(price)})</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialogs}
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
                                {paymentMethod === "Pix" && (
                                    <>
                                        <Grid item xs={12}>
                                            <Image
                                                src={
                                                    name === "Mensal"
                                                        ? QrCodeMensal
                                                        : QrCodeSemestral
                                                }
                                                alt={`QR Code for ${name} plan`}
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
                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                label="Código copia e cola"
                                                value={textCodigoMensal}
                                                fullWidth
                                                aria-readonly
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
                            onClick={handleCloseDialogs}
                        >
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            color: "var(--dark-color)",
                        }}
                    >
                        Benefícios:
                    </Typography>
                </Box>
                <Box
                    noValidate
                    sx={{
                        p: 2,
                    }}
                >
                    {benefits?.map((benefit, index) => (
                        <BenefitLine key={index} label={benefit} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

export default OfferCard;
