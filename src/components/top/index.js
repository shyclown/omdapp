import {useHistory} from "react-router-dom";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, isWidthDown, useTheme, withWidth} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import logo from '../../assets/logo/logo_textless.svg';
import Drawer from '@material-ui/core/Drawer';
import {compose} from "redux";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {withRouter} from "react-router";
import {DrawerNavigationComponent, TopNavigationComponent} from "../Navigation";
import Spacer from "../Space";

const useStyles = makeStyles((theme) => createStyles({
    logo: {
        fill: theme.palette.secondary.light,
    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        color:'white',
        // color: theme.palette.secondary.light,
    },
    topBar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.light,
    },

    link: {
        cursor: 'pointer',
        padding:'16px 16px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    }
}));

export const TopBar = compose(withWidth(), withRouter)((props) => {

    const classNames = useStyles();
    const [state, setState] = React.useState({ left: false });

    const theme = useTheme();
    const history = useHistory();
    const xs = isWidthDown('xs', props.width);

    const toggleDrawer = (side, open) => event => {
      if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
      ){ return; }
        setState({ ...state, [side]: open});
    };


    return <div >
        <div className={classNames.toolbar}>
            {
                xs &&
                <React.Fragment>
                    <Toolbar>
                        <IconButton onClick={toggleDrawer('left', true)}>
                            <MenuIcon style={{color: 'white'}}/>
                        </IconButton>
                        <img height={30} src={logo}/>
                        <Typography style={{marginLeft: '16px'}}>SachOMD</Typography>
                    </Toolbar>
                    <Drawer
                        open={state.left}
                        onClose={toggleDrawer('left', false)}
                    >
                        <DrawerNavigationComponent navigation={props.navigation}/>
                    </Drawer>
                </React.Fragment>
            }
            {   !xs &&
                <div style={{margin: '0 auto', maxWidth: '1032px'}}>

                    <Toolbar disableGutters classes={{root: classNames.toolbar}}>
                        <div style={{padding:"4px"}} className={classNames.logo}>
                            <img height={30} src={logo}/>
                        </div>
                        <Typography variant={'h5'} style={{color:'white'}}>Šachomd, Motto</Typography>
                        <Spacer/>
                    </Toolbar>

                </div>
            }
        </div>
        {
            !xs &&
            <div className={classNames.topBar}>
                <div style={{display: 'flex', margin: '0 auto', maxWidth: '1032px'}}>
                    <Toolbar>
                        <TopNavigationComponent
                            navigation={props.navigation}
                        />
                    </Toolbar>
                </div>
            </div>
        }
    </div>
});



