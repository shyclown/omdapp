import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CardContent, createStyles, isWidthDown} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import {compose} from "redux";
import {connect} from "react-redux";

import {SideNavigationComponent} from "../Navigation";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {ChessDialogs} from "../ChessDialogs";
import MenuList from "@material-ui/core/MenuList";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => createStyles({
    sidePanelItemsLink: {
        backgroundColor: '#eaeaea', cursor: 'pointer',
        //borderBottom: 'solid 2px #fcb436',
        margin: '2px 0px',
        lineHeight: '40px',
        padding:'4px 8px',
    },
    sidePanelItemsLabel: {
        fontSize: '1rem',
        lineHeight: '2.1rem',
        color: '#fcb436',
        fontWeight: '500',
        marginTop: '16px',
        marginBottom: '16px',
        // borderBottom: 'solid 2px #fcb436',
    },
    link: {
        padding:'16px 16px',
        '&:hover': {
            backgroundColor:'#f6b322'
        }
    }
}));

const mapStateToProps = (state, ownProps) => ({
    navigations: state.navigations.navigations
});

export const SidePanel = compose(
    withWidth(),
    connect(mapStateToProps, {})
)((
    props
) => {
    const xs = isWidthDown('xs', props.width);
    const classNames = useStyles();
    const infoNavigation = props.navigations && props.navigations.find(nav => nav.entity.name === 'sideInfoNavigation');
    const chessNavigation = props.navigations && props.navigations.find(nav => nav.entity.name === 'sideChessNavigation');
    const eventsNavigation = props.navigations && props.navigations.find(nav => nav.entity.name === 'sideEventsNavigation');

    if(xs) { return null; }
    return props.navigations && <div
        style={{
            minWidth: '200px',
            maxWidth:'200px',
            marginLeft: '36px',
        }}
    >
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Card elevation={0}>
                    <SideNavigationComponent navigation={infoNavigation}/>
                </Card>
            </Grid>
            <Grid item xs={12}>

                    <iframe style={{
                        borderRadius:'5px',
                        border:'none',
                        backgroundColor:'white',
                        padding:'0px',
                        margin:'0px',
                    }} src="https://sachy.cz?display=chessboard" scrolling="no" width="200" height="200" frameBorder="0"><p>Your browser does not support
                        iframes.</p>
                    </iframe>

            </Grid>
            <Grid item xs={12}>
                <Card elevation={0}>

                    <List>
                        <ListSubheader component="div">
                            {
                                'Hraj'
                            }
                        </ListSubheader>
                        <ChessDialogs menu/>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card elevation={0}>
                    <SideNavigationComponent navigation={chessNavigation}/>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card elevation={0}>
                    <SideNavigationComponent navigation={eventsNavigation}/>
                </Card>
            </Grid>



        </Grid>
    </div>
});