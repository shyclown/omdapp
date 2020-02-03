import {useHistory} from "react-router-dom";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, isWidthDown, withWidth} from "@material-ui/core";
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

const useStyles = makeStyles((theme) => createStyles({

    link: {
        padding:'16px 16px',
        '&:hover': {
            backgroundColor:'#f6b322'
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
        <div className={classNames.topBar} style={{backgroundColor: '#082962', color: 'white'}}>
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
                <div style={{display: 'flex', margin: '0 auto', maxWidth: '1000px', padding: '16px 16px'}}>


                    <b>SachOMD, Motto</b>
                    <div style={{flexGrow: 1}}></div>
                    <span>EN / SK</span>
                </div>
            }
        </div>
        {
            !xs &&
            <div className={classNames.topBar}
                 style={{backgroundColor: '#7db7e1', color: '#082962'}}>
                <div style={{display: 'flex', margin: '0 auto', maxWidth: '1032px'}}>
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
const TopLink = (props) => {
    let history = useHistory();
    const classNames = useStyles();
    return <div
        onClick={ () => {
            const link = props.link.split(' ').join('_');
            history.push(link);
        } }
        className={classNames.link}
        style={{
            cursor: 'pointer',
        }}
    >
        {props.link || ''}
    </div>
        ;
};


