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

export default function Ad({ auth, ad }) {
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
                        {/* <PageBox
                            title="Meus anúncios"
                            subTitle="Veja seus anúncios como vendedor"
                        >
                            
                        </PageBox> */}
                        <div>{JSON.stringify(ad)}</div>
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
