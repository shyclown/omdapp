import React, {useEffect, useState} from 'react';
import './App.css';

import UniversalPanel from "./universal/UniversalPanel";
import {ThemeProvider} from "@material-ui/core/styles";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

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


    useEffect(() => {

        load && props.loadNavigationsAction();
        setLoad(false);

    });

    const topNavigation = props.navigations && props.navigations.find(nav => nav.entity.name === 'topNavigation');
    const topNavigationLinks = topNavigation ? Navigation.links(topNavigation) : [];



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
                        <Switch>
                        {
                            props.navigations && props.navigations.map (
                                (navigation) => navigation.elements && navigation.elements.map(
                                    (linkItem) => (
                                        <Route
                                            key={linkItem.id}
                                            path={'/'+createLink(linkItem.entity.name)}
                                        >
                                            <Content linkItem={linkItem} link={linkItem.entity.name}/>
                                        </Route>
                                    )
                                )
                            )
                        }
                        <Route path={'/item/:itemType/:itemId'}>
                            <Content linkItem={{}} link={'name'}/>
                        </Route>
                        </Switch>
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
    withWidth(),
    connect(
    mapStateToProps, {
        loadNavigationsAction,

    }
))(App);
