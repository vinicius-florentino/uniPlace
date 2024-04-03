import React from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import RemixIcon from "@/Components/RemixIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "16px",
    border: "var(--borders)",
    backgroundColor: "#FFF",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {},
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 2),
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
    },
}));

export default function SearchField({ onChange, onSubmit }) {
    return (
        <Box>
            <Search>
                <StyledInputBase
                    placeholder="Buscar"
                    inputProps={{ "aria-label": "search" }}
                    onChange={onChange}
                />
                <Button onClick={onSubmit} sx={{marginRight: "10px"}}>
                    <RemixIcon className="ri-search-line" />
                </Button>
            </Search>
        </Box>
    );
}
