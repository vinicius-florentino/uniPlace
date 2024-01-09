// import { Link } from '@inertiajs/react';
import { useEffect } from "react";
import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Loading from "@/Components/Loading";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Register({universities}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        is_student: false,
        university: "",
    });

    const [showUniversitySelect, setShowUniversitySelect] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    useEffect(()=>{
        if(data.is_student){
            setShowUniversitySelect(true)
        }else{
            setShowUniversitySelect(false)
        };
    },[data.is_student]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    return (
        <GuestLayout>
            <Head title="Cadastrar" />
            <Box noValidate component="form" onSubmit={submit}>
                <Grid container spacing={0} rowGap={2}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            helperText={errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            label="Senha"
                            variant="outlined"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                            helperText={errors.password}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Confirmação de senha"
                            variant="outlined"
                            type="password"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            error={errors.password_confirmation}
                            helperText={errors.password_confirmation}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Você é estudante?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="is_student"
                                value={data.is_student}
                                onChange={handleChange}
                                >
                                <FormControlLabel value={true} control={<Radio />} label="Sim" onChange={handleChange}  />
                                <FormControlLabel value={false} control={<Radio />} label="Não" onChange={handleChange} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {showUniversitySelect && (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="university-label">Selecione sua universidade</InputLabel>
                                <Select
                                    labelId="university-label"
                                    id="university"
                                    name="university"
                                    value={data.university}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {universities.map((uni) => (
                                        <MenuItem key={uni.id} value={uni.id}>
                                            {uni.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={processing}
                            disableElevation
                            fullWidth
                            endIcon={processing && <Loading />}
                        >
                            {!processing && "Cadastrar"}
                        </Button>
                    </Grid>                    
                    <Grid item xs={12} 
                         display={"flex"}
                         alignItems={'center'}
                         justifyContent={'center'}
                         >
                        <Link href={route("login")} >Fazer login</Link>
                    </Grid>
                </Grid>
            </Box>
        </GuestLayout>
    );
}
