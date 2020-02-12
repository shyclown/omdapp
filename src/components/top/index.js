import {useHistory, useRouteMatch} from "react-router-dom";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, isWidthDown, useTheme, withWidth} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import {links} from "../../utils/mock";
import IconButton from "@material-ui/core/IconButton";

import {isWidthUp} from "@material-ui/core";

import Drawer from '@material-ui/core/Drawer';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {compose} from "redux";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router";

const useStyles = makeStyles((theme) => createStyles({

    toolbar: {
        backgroundColor: theme.palette.primary.main,
        color:'white'
    },
    topBar: {
      backgroundColor: theme.palette.primary.light,
    },

    link: {
        cursor: 'pointer',
        padding:'16px 16px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    }
}));

export const TopBar = compose(withWidth())(
    (props) => {
    const classNames = useStyles();

    const [state, setState] = React.useState({
       left: false,
    });

    let history = useHistory();
    let xs = isWidthDown('xs', props.width);

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
                xs && <React.Fragment>
                    <Toolbar>

                        <IconButton onClick={toggleDrawer('left', true)}>
                            <MenuIcon style={{color: 'white'}}/>
                        </IconButton>
                        <Typography>SachOMD</Typography>
                    </Toolbar>
                    <Drawer
                        open={state.left}
                        onClose={toggleDrawer('left', false)}
                    >
                        <List>

                        {
                            links.map(
                                (link, index) => <ListItem button
                                    key={index}
                                    onClick={() => {
                                        setState({left: false});
                                        history.push(getLink(link));
                                    }}

                                >
                                    <ListItemIcon><HomeIcon/></ListItemIcon>
                                    <ListItemText primary={link}/>
                                </ListItem>
                            )
                        }
                        </List>
                    </Drawer>
                </React.Fragment>
            }
            {   !xs &&
                <div style={{

                    margin: '0 auto',
                    maxWidth: '1000px',

                }}>

                    <Toolbar disableGutters classes={{root: classNames.toolbar}}>
                        <Typography variant={'h5'} style={{color:'white'}}>Šachomd, Motto</Typography>
                        <div style={{flexGrow: 1}}></div>
                        <span>EN / SK</span>
                    </Toolbar>

                </div>
            }
        </div>
        {
            !xs &&
            <div className={classNames.topBar}>
                <div style={{display: 'flex', margin: '0 auto', padding:'8px 16px', maxWidth: '1032px'}}>
                    {
                        links.map(
                            (link, index) =>
                                <TopLink key={index} link={link}/>
                        )
                    }


                    <div style={{flexGrow: 1}}></div>
                    <span>HLADAJ</span>
                </div>
            </div>
        }
    </div>
});
const getLink = (link) => link.split(' ').join('_');

const TopLink = withRouter((props) => {

    const link = getLink(props.link);
    const selected = (props.location.pathname === '/'+link);



    let history = useHistory();
    let theme = useTheme();
    return <Button
        key={props.link}
        disableElevation
        variant={ 'contained'}
        style={{
            backgroundColor: selected ? theme.palette.secondary.light : 'inherit',
            color: theme.palette.primary.dark
        }}

        onClick={ () => {
            history.push(link);
        } }

    >
        {props.link || ''}
    </Button>
        ;
});


