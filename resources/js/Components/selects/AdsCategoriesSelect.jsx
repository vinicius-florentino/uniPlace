import React, { useEffect, useState } from "react";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

export const AdsCategoriesSelect = ({id, name, label, onChange, value, error, helperText, fullWidth, disabled}) => {

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/ad-categories`)
            .then((response) => {
                setOptions(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
            });
        setLoading(false);
    }, [setLoading]);

    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel id="demo-simple-select-label" disabled={loading || disabled}>{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={id}
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                disabled={loading || disabled}
                error={error}
            >
                <MenuItem value="">Selecione</MenuItem>
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default AdsCategoriesSelect;
