import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export const AdCategoriesAutoComplete = () => {

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    };

    useEffect(() => {
        setLoading(true);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeoutId = setTimeout(() => {
            if (search.trim() !== "") {
                axios
                    .get(`/api/ad-categories?search=${search}`)
                    .then((response) => {
                        setOptions(response.data);
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar dados:", error);
                    });
            }
        }, 500);

        setSearchTimeout(timeoutId);
        setLoading(false);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [search, loading]);

    return (
        <Autocomplete
            // value={search}
            // onChange={handleChange}
            disablePortal
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.name}
            fullWidth
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Categorias"
                    onChange={handleSearchChange}
                    value={search}
                />
            )}
            loading={loading}
            loadingText={"Carregando"}
            noOptionsText={"Nenhum resultado encontrado"}
        />
    );
};

export default AdCategoriesAutoComplete;
