const MuiTheme = {
    palette: {
        primary: {
            main: "#1d28ac",
        },
        secondary: {
            main: "#5758bd",
        },
        success: {
            main: "#00a059",
        },
        warning: {
            main: "#e2c900",
        },
        info: {
            main: "#00b9ff",
        },
        error: {
            main: "#dc3545",
        },
        outline: "#E0E2E4",
    },

    typography: {
        allVariants: {
            fontFamily: "var(--font-family)",
            textTransform: "none",
            fontSize: 14,
        },
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "var(--box-shadow)",
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    boxShadow: "var(--box-shadow)",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        color: "var(--dark-color)",
                        fontSize: 14,
                        fontWeight: 700,
                    },
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    "& .MuiTableRow-root:nth-of-type(odd)": {
                        backgroundColor: "var(--ultra-light-color)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: "40px",
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: 14,
                    borderRadius: "32px",
                    minWidth: "80px",
                },
                contained: {
                    "&.Mui-disabled": {
                        color: "var(--white-color)",
                        backgroundColor: "var(--hover-color)",
                    },
                },
                text: {
                    borderRadius: "0px",
                    borderBottom: "2px solid var(--white-color)",
                    "&:hover": {
                        backgroundColor: "inherit",
                        borderBottom: "2px solid var(--dark-color)",
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
                containedSuccess: {
                    border: "1px solid var(--success-color)",
                    backgroundColor: "var(--white-color)",
                    color: "var(--success-color)",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    minHeight: "50px",
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: "var(--primary-color)",
                    width: "32px",
                    height: "32px",
                    fontSize: 14,
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
                    fontWeight: 400,
                    "&:hover": {
                        textDecoration: "underline",
                    },
                    fontSize: 14,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {},
                paper: {
                    width: "300px",
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: "44px",
                    //   height: "24px"
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
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: 20,
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: "16px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: 20,
                },
            },
            defaultProps: {
                InputLabelProps: {
                    // shrink: true,
                    // disableAnimation: true,
                },
            },
        }
    },
};

export default MuiTheme;
