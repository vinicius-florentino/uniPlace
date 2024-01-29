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
                containedDanger: {
                    border: "1px solid var(--danger-color)",
                    backgroundColor: "var(--white-color)",
                    color: "var(--danger-color)",
                },
                root: {
                    height: "40px",
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: 14,
                    borderRadius: "360px",
                    minWidth: "80px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    height: "50px"
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    margin: "5px 0px",
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
                    fontSize: "14px",
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
    },
};

export default MuiThemeMod;
