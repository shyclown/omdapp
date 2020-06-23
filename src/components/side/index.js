import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, isWidthDown} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import {compose} from "redux";
import {connect} from "react-redux";

import {SideNavigationComponent} from "../Navigation";

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