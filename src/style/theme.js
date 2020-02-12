import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blue, green, grey, orange, purple, yellow} from "@material-ui/core/colors";

const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none'
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
            main: blue["800"],// '#082962',
            light:blue["300"],//'#7cb6e0'
            contrastText:'white',
        },
        secondary: {
            dark: orange['800'],//'#af7d25',
            main: orange['600'],//'#fab336',
            light:orange['300'],//'#fbc25e',
        }
    }
});


export default theme;
