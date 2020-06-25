import React, {useEffect, useState} from 'react';
import './App.css';

import UniversalPanel from "./universal/UniversalPanel";
import {ThemeProvider} from "@material-ui/core/styles";
import {HashRouter as Router, Switch, Route, withRouter} from "react-router-dom";

import theme from './style/theme';
import Content from "./components/content";

import {TopBar} from "./components/top";
import BottomBar from "./components/footer";
import {connect} from "react-redux";
import {compose} from "redux";
import {loadNavigationsAction} from "./utils/redux/actions/navigations";
import {createLink} from "./utils/greateLink";

import history from './utils/history';
import withWidth, {isWidthDown} from "@material-ui/core/withWidth";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Spacer from "./components/Space";
import Button from "@material-ui/core/Button";
import bg from "./assets/images/figurky_clipped.jpg";
import Typography from "@material-ui/core/Typography";
import {SidePanel} from "./components/side";
import withStyles from "@material-ui/core/styles/withStyles";
import {createStyles} from "@material-ui/core";
import {links} from "./utils/mock";
import {NavigationTitleComponent} from "./components/Navigation";


const styles = (theme) => createStyles({
    divider: {
        // backgroundColor: theme.color.grey.light,
    },
    content: {
    },
    contentItem: {
        display: 'flex',
        // backgroundColor:'#444',
        margin: '16px 0px'
    },
    contentItemImage: {
        minWidth: '200px',
        backgroundImage: `url(${bg})`,

        marginRight: '24px',
    },
    contentItemDateSeparator: {
        fontWeight: '500',
        display:'flex',
        // backgroundColor: '#81b7df',
        backgroundColor: '#fcb436',
        color:'black',
        padding: '0 8px',
        fontSize: '1rem',
        lineHeight: '2.1rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    contentItemTop: {
        color: '#fcb436',
        fontWeight: '500',
    },
    contentItemInfo: {
        display: 'flex',
        padding: '4px 0px',
        borderBottom: 'solid 2px #fcb436',
        fontWeight: '500',
    },
    contentItemHeader: {
        fontSize: '2rem',
        lineHeight: '2.1rem',
        marginBottom: '1rem',
        marginTop: '0.2rem'
    },

});

const gapi = window.gapi;

const CLIENT_ID = "664742009776-n23slos09r4qseo5pbjic6qo1bd3qe0i.apps.googleusercontent.com";
const API_KEY = "AIzaSyAJ0tl16XnnSPVbx1XRinN2OKCXcfDB9Fk";
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */

let loaded = null;

gapi.client &&
gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
}).then(function () {
// Listen for sign-in state changes.
   gapi.client.sheets.spreadsheets.values
       .get({
           spreadsheetId: '1541999hALHI9fQuqhnzN9NTlHahUOinNwqKHEga_Y_w',
           range: 'Sheet1!A:E'
       })
       .then((response) => {
           let result = response.result;
           let numRows = result.values ? result.values.length : 0;
           console.log(result);
           console.log(`${numRows} rows retrieved.`);
       });

}, function(error) {
    // cant load
});

export class Navigation {
    static entity = (navigation)=> navigation.entity;
    static getElements = (item) => item ? item.elements : false;
    static links = (navigation) => {
        return Navigation.getElements(navigation) || [];
    }
}

function App (props) {

    const [load, setLoad] = useState(true);
    const [currentItem, setCurrentItem] = useState('Vitaj');

    console.log(history);

    useEffect(() => {

        load && props.loadNavigationsAction();
        setLoad(false);

    });

    const topNavigation = props.navigations && props.navigations.find(nav => nav.entity.name === 'topNavigation');
    const topNavigationLinks = topNavigation ? Navigation.links(topNavigation) : [];

    const xs= isWidthDown('xs', props.width);

    const linkItem = '';

    return (
        <Router history={history}>

            <ThemeProvider theme={theme}>


            <UniversalPanel
                singlePanel
                toolbar={
                    <TopBar
                        navigation={topNavigation}
                        links={
                            topNavigationLinks
                        }
                    />
                }
                content={
                    topNavigationLinks && <div style={{ backgroundColor: '#eeeeee'}}>
                        <div className={props.classes.content}>
                            <div style={{
                                width: '100%',
                                height: '250px',
                                backgroundSize: 'cover',
                                backgroundImage: `url(${bg})`,
                                position: 'relative',

                            }}>
                                <div style={{display: 'flex', margin: '0 auto', maxWidth: '1000px'}}>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '16px',
                                        paddingLeft: '16px',
                                        fontSize: '3rem',
                                        fontWeight: '500',
                                        color: 'white'
                                    }}
                                    >
                                        <Typography variant={xs ? 'h3' : 'h2'}>
                                            <NavigationTitleComponent navigations={props.navigations}/>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                margin: '0 auto',
                                maxWidth: '1000px',
                                padding: '8px'
                            }}>
                                <Switch>
                                    {
                                        props.navigations && props.navigations.map (
                                            (navigation) => navigation.elements && navigation.elements.map(
                                                (linkItem) => (
                                                    <Route
                                                        key={linkItem.id}
                                                        path={'/'+createLink(linkItem.entity.name)}
                                                    >
                                                        <Content
                                                            linkItem={linkItem}
                                                            link={linkItem.entity.name}
                                                        />
                                                    </Route>
                                                )
                                            )
                                        )
                                    }
                                    <Route path={'/item/:itemType/:itemId'}>
                                        <Content linkItem={{}} link={'name'}/>
                                    </Route>
                                </Switch>
                                <SidePanel selectItem={(item) => setCurrentItem(item)}/>
                            </div>
                        </div>
                    </div>
                }
                footer={
                    isWidthDown("xs", props.width) && <BottomBar/>
                }
            />

            </ThemeProvider>
        </Router>
    );
}

const mapStateToProps = (state, ownProps) => ({
    navigations: state.navigations.navigations
});

export default compose(
    withStyles(styles),
    withWidth(),
    connect(
    mapStateToProps, {
        loadNavigationsAction,

    }),
)(App);
