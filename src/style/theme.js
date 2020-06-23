import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blue, grey, } from "@material-ui/core/colors";

const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
        h5: {
            fontFamily: 'Roboto',
            fontWeight: '500',
            color: blue["800"],
        },
        h1: {
            fontFamily: 'upgrade',
            fontWeight: '500',
        },
        h2: {
            fontFamily: 'upgrade',
            fontWeight: '500',
        },
        h3: {
            fontFamily: 'upgrade',
            fontWeight: '500',
        }
    },
    color: {
        grey: {
            dark: grey[700],
            main: grey[500],
            light: grey[300],
        }

    },
    palette: {
        // type: "dark",

        primary: {
            dark:blue["900"],//'#051c44',
            main: blue["800"],// '#002963',// blue["800"],// '#082962',
            light: '#78B6E4', //blue["300"],//'#7cb6e0'
            contrastText:'white',
        },
        secondary: {
            dark: '#af7d25',
            main: '#fab336',
            light:'#fbc25e',
        }
    }
});


export default theme;
