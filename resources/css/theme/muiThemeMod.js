const MuiThemeMod = {

    palette: {
        primary : {
            main: "#1d28ac",
        },
        success : {
            main: "#00a059",
        },
        warning : {
            main: "#e2c900",
        },
        error : {
            main: "#f20d00",
        },
        outline: '#E0E2E4'
    },

    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    "&.Mui-disabled": {
                        "color": "var(--white-color)",
                        "background": "var(--hover-color)",
                    },
                    height: "40px",
                },
                root: {
                    fontWeight: 400,
                    fontSize: 16,
                    textTransform: "none",
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px"
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
                    }
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "var(--white-color)",
                    borderBottom: "var(--borders)",
                    boxShadow: "none"
                },
            },
        },
    }
};

export default MuiThemeMod;