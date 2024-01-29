const MuiThemeMod = {
    palette: {
        primary: {
            main: "#1d28ac",
        },
        success: {
            main: "#00a059",
        },
        warning: {
            main: "#e2c900",
        },
        error: {
            main: "#f20d00",
        },
        outline: "#E0E2E4",
    },

    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    "&.Mui-disabled": {
                        color: "var(--white-color)",
                        backgroundColor: "var(--hover-color)",
                    },
                },
                containedLight: {
                    backgroundColor: "inherit",
                    color: "var(--dark-color)",
                    border: "var(--borders)",
                },
                containedDanger:{
                    backgroundColor: "var(--danger-color)",
                    color: "var(--white-color)",    
                },
                root: {
                    height: "40px",
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: 14,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "var(--dark-color)",
                    textDecoration: "none",
                    fontWeight: 300,
                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "var(--white-color)",
                    borderBottom: "var(--borders)",
                    boxShadow: "none",
                },
            },
        },
    }
};      

export default MuiThemeMod;
