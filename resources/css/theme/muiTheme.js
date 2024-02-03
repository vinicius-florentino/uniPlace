const MuiTheme = {
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
            main: "#dc3545",
        },
        outline: "#E0E2E4",
    },

    typography: {
        allVariants: {
            fontFamily: "var(--font-family)",
            textTransform: "none",
            fontSize: 14
        },
    },

    components: {
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
                        borderBottom: "2px solid var(--dark-color)"
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
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    height: "50px",
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: "var(--secondary-color)",
                    width: "32px",
                    height: "32px",
                    fontSize: 16
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
                    fontSize: 14
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
              root: {
                
              },
              paper: {
                width: '300px',
              },
            },
          },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                  minWidth: "44px",
                //   height: "24px"
                },
            }
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
                    fontSize: 20
                },
            },
        }
    },
};

export default MuiTheme;
