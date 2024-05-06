import React from "react";
import Container from "@mui/material/Container";
import { Typography, Box } from "@mui/material";
import errorImage from '../Assets/404.svg';
import { Head } from "@inertiajs/react";
import Header from "../Layouts/NavigationLayout/Components/Header";
import Image from "../Components/Image";

export default function Error({ status, auth }) {

    const title = {
        503: "503: Serviço Indisponível",
        500: "500: Erro no Servidor",
        404: "404: Página Não Encontrada",
        403: "403: Proibido",
    }[status];

    const description = {
        503: "Desculpe, estamos realizando uma manutenção. Por favor, volte mais tarde.",
        500: "Ops, algo deu errado em nossos servidores.",
        404: "Desculpe, a página que você está procurando não pôde ser encontrada.",
        403: "Desculpe, você está proibido de acessar esta página.",
    }[status];

    return (
        <>
            <Header user={auth} />
            <Head title="Error" />
            <Container maxWidth="lg" sx={{
                height: '85vh',
                width: "100%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Image
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "fill",
                        }}
                        src={errorImage}
                    />
                    <Typography sx={{ fontWeight: 500, fontSize: 24 }}>{title}</Typography>
                    <Typography sx={{ fontSize: 20}}>{description}</Typography>
                </Box>
            </Container>
        </>
    );
}
