import React from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import RemixIcon from "@/Components/RemixIcon";

export default function SearchField({}) {

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: "16px",
        border: "var(--borders)",
        marginLeft: 0,
        width: "100%",
        backgroundColor: "#FFF",
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
        color: "var(--dark-color)",
        alignItems: "center",
        justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        width: "100%",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
