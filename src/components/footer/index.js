import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

import InfoIcon from '@material-ui/icons/Assignment';
import ChessIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Tab from "@material-ui/core/Tab";
import {DefaultMenu} from "../InfoMenu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";


const useStyles = makeStyles((theme) => createStyles({
    root: { height: '56px'},

    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },


}));

export const BottomBar = (props) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [open, setOpen] = React.useState(null);
    const [anchor, setAnchor] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Paper square className={classes.root}>
            <BottomNavigation
                className={classes.stickToBottom}
                showLabels
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <BottomNavigationAction icon={<InfoIcon />} label="Informacie" onClick={(event)=> {
                    setAnchor(event.currentTarget);
                    setOpen('info');
                }} />
                <BottomNavigationAction icon={<ChessIcon />} label="Sach" onClick={(event)=> {
                    setAnchor(event.currentTarget);
                    setOpen('chess');
                }}/>
            </BottomNavigation>

                <DefaultMenu
                    open={open == 'info'}
                    items={[
                        {name:'Novinky'},
                        {name:'Archiv'},
                    ]}
                    handleClose={()=>setOpen(null)}
                    onClose={()=>setOpen(null)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                    anchorEl={anchor}
                />
                <DefaultMenu
                    open={open == 'chess'}
                    items={[
                        {name: 'Zahraj si'},
                        {name: 'Sachove videa'},
                        {name: 'Nasi Sachisti'},
                        {name: 'Historia klubu'},
                        {name: 'Odkazy'}
                    ]}
                    handleClose={()=>setOpen(null)}
                    onClose={()=>setOpen(null)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                    anchorEl={anchor}
                />


        </Paper>

}
