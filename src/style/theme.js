import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blue, green, orange, purple, yellow} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        // type: "dark",
        primary: {
            dark:'#051c44',
            main: '#082962',
            light:'#7cb6e0'
        },
        secondary: {
            dark:'#af7d25',
            main: '#fab336',
            light:'#fbc25e',
        }
    }
});


export default theme;
