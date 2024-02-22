import React from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import RemixIcon from "@/Components/RemixIcon";

export default function SearchField({}) {

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        border: "var(--borders)",
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
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
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        width: "100%",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "30ch",
                },
            },
        },
    }));

    return (
        <Search sx={{ color: "var(--dark-color)" }}>
            <SearchIconWrapper>
                <RemixIcon className="ri-search-line"/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Buscar"
                inputProps={{ "aria-label": "search" }}
            />
        </Search>
    );
}
