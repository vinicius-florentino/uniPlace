import React from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import RemixIcon from "@/Components/RemixIcon";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const Search = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    border: "var(--borders)",
    backgroundColor: "var(--white-color)",
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //     width: "auto",
    // },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     '&:hover': {},
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 2),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
    },
}));

export default function SearchField({ onChange, onSubmit, disabled, value }) {
    return (
        <Box sx={{ width: "100%" }}>
            <Search>
                <StyledInputBase
                    placeholder="Buscar"
                    inputProps={{ "aria-label": "search" }}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                />
                <IconButton
                    onClick={onSubmit}
                    disabled={disabled}
                    sx={{ marginRight: "8px" }}
                >
                    <RemixIcon className="ri-search-line" />
                </IconButton>
            </Search>
        </Box>
    );
}
