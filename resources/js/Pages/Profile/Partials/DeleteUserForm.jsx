import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <Grid>
            <Grid sx={{
                mb: "10px"
            }}>
                <Typography>Deletar sua conta</Typography>
                <Typography>
                    Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes
                    excluir sua conta, baixe quaisquer dados ou informações que você deseja reter.
                </Typography>
            </Grid>
            <Grid sx={{
                alignItems: "center",
                mt: "10px",
            }}>
                <Button 
                    variant="containedDanger"
                    type="submit"
                    disabled={processing}
                    disableElevation
                    sx={{
                        backgroundColor: "var(--danger-color)",
                        width: { xs: "100%", md: "auto" }, 
                    }} onClick={confirmUserDeletion}>
                        Delete sua conta
                </Button>
            </Grid>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <Box noValidate component="form" onSubmit={deleteUser} className="p-6">
                    <Grid>
                        <Typography>
                            Você tem certeza que deseja excluir sua conta?
                        </Typography>

                        <Typography>
                            Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Por favor
                            digite sua senha para confirmar que deseja excluir permanentemente sua conta.
                        </Typography>

                        <Grid>
                            <InputLabel htmlFor="password" value="Password" className="sr-only" />
                            <TextField 
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                isFocused
                                placeholder="Password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </Grid>

                        <Grid className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <DangerButton className="ms-3" disabled={processing} sx={{
                                    backgroundColor: "--danger-color"
                                }}>
                                Delete Account
                            </DangerButton>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
}
