import { Link, useForm, usePage } from "@inertiajs/react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {

    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const onSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => (
                toast.success("Alteração de dados concluída!")
            ),
            onError: () => {
                toast.error("Ocorreu um erro!")
            }
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    return (
        <>
            <Box
                sx={{ width: "100%" }}
                noValidate
                component="form"
                onSubmit={onSubmit}
            >
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Nome"
                            variant="outlined"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                            helperText={errors.name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            helperText={errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <Grid item xs={12} md={6}>
                            <Typography className="text-sm mt-2 text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </Typography>

                            {status === "verification-link-sent" && (
                                <Grid className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to
                                    your email address.
                                </Grid>
                            )}
                        </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={processing}
                            disableElevation
                            sx={{
                                width: { xs: "100%", md: "auto" },
                            }}
                        >
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
