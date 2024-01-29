import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PageBox from "@/Components/pagebox/PageBox";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfil" />

            <Box noValidate sx={{ width: "100%", py: 2 }}>
                <Grid container spacing={0} rowSpacing={2}>
                    <Grid item xs={12}>
                        <PageBox
                            title="Informações do perfil"
                            subTitle="Atualize as informações de perfil e endereço de email da sua conta"
                        >
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </PageBox>
                    </Grid>

                    <Grid item xs={12}>
                        <PageBox
                            title="Atualize sua senha"
                            subTitle="Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura."
                        >
                            <UpdatePasswordForm />
                        </PageBox>
                    </Grid>
                    <Grid item xs={12}>
                        <PageBox
                            title="Excluir conta"
                            subTitle="Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes
                            excluir sua conta, baixe quaisquer dados ou informações que você deseja reter."
                        >
                            <DeleteUserForm />
                        </PageBox>
                    </Grid>
                </Grid>
            </Box>
        </AuthenticatedLayout>
    );
}
