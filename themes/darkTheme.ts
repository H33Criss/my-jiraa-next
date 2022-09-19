import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        lighter: true;
    }
}

const primaryColor = '#4a148c';
const secondaryColor = '#19857b';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        info: {
            main: '#fff'
        }


    },
    components: {

        MuiButtonBase: {
            styleOverrides: {

                root: {
                    borderRadius: '10px !important',
                    color: '#F2F2F2 !important',
                    transition: 'scale .15s, transform .15s !important',
                    "&:hover": {
                        scale: ' 1.02 !important',
                        transform: 'translateY(-1px) !important'
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(2, 2, 2, .85) !important',
                },
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backdropFilter: ' blur(8px) !important'
                },
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'lighter' },
                    style: {
                        color: 'black !important',
                        backgroundColor: 'white !important',
                        boxShadow: '0 2px 9px 0 white !important',
                    },
                },
            ],

            styleOverrides: {
                containedPrimary: {
                    boxShadow: `0 4px 14px 0 ${primaryColor} !important`,
                },
                containedSecondary: {
                    boxShadow: `0 4px 14px 0 ${secondaryColor} !important`,
                },
                outlinedError: {
                    ":hover": {
                        boxShadow: `0 1px 5px 0 red !important`,
                    }
                }
            }
        }
    },
});