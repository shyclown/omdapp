import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

import InfoIcon from '@material-ui/icons/Assignment';
import ChessIcon from '@material-ui/icons/Apps';

import {DefaultMenu} from "../InfoMenu";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {compose} from "redux";
import withWidth from "@material-ui/core/withWidth";
import {connect} from "react-redux";
import {loadNavigationsAction} from "../../utils/redux/actions/navigations";
import {getLinkEntities} from "../Navigation";
import {withRouter} from "react-router";
import createLink from "../../utils/greateLink";


const useStyles = makeStyles((theme) => createStyles({
    root: { height: '56px'},

    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },


}));

const BottomBar = (props) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [open, setOpen] = React.useState(null);
    const [anchor, setAnchor] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const infoNavigation = props.navigations && props.navigations.find(
        nav => nav.entity.name === 'sideInfoNavigation'
    );
    const chessNavigation = props.navigations && props.navigations.find(
        nav => nav.entity.name === 'sideChessNavigation'
    );

console.log(infoNavigation);

    return <Paper square className={classes.root}>
            <BottomNavigation
                className={classes.stickToBottom}
                showLabels
                onChange={handleChange}
                variant="fullWidth"
                aria-label="icon label tabs example"
            >

                <BottomNavigationAction
                    icon={<InfoIcon />}
                    label="Informacie"
                    onClick={(event)=> {
                        setAnchor(event.currentTarget);
                        setOpen('info');
                    }}
                />

                <BottomNavigationAction
                    icon={<ChessIcon />}
                    label="Sach"
                    onClick={(event)=> {
                        setAnchor(event.currentTarget);
                        setOpen('chess');
                    }}
                />
            </BottomNavigation>

                <DefaultMenu
                    open={open === 'info'}
                    items={
                        getLinkEntities(infoNavigation) || []
                    }
                    handleClose={()=>{
                        setOpen(null)
                    }}
                    handleClick={
                        (item)=>(e)=>{
                            props.history.push(createLink('/'+item.name))
                            setOpen(null)
                        }
                    }
                    onClose={()=>{
                        setOpen(null)
                    }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                    anchorEl={anchor}
                />

                <DefaultMenu
                    open={open === 'chess'}
                    items={
                        getLinkEntities(chessNavigation) || []
                    }
                    onClick={
                        (item)=>(e)=>{
                            props.history.push(createLink('/'+item.name))
                            setOpen(null)
                        }
                    }
                    handleClose={()=>setOpen(null)}
                    onClose={()=>setOpen(null)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                    anchorEl={anchor}
                />


        </Paper>

}

const mapStateToProps = (state, ownProps) => ({
    navigations: state.navigations.navigations
});

export default compose(
    withWidth(),
    connect(mapStateToProps, {}),
    withRouter,
)(BottomBar);
