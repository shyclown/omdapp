import React, {useEffect, useState} from 'react';
import './App.css';

import UniversalPanel from "./universal/UniversalPanel";
import {ThemeProvider} from "@material-ui/core/styles";
import {HashRouter as Router, Link, Switch, Route, Redirect} from "react-router-dom";

import theme from './style/theme';
import {links} from "./utils/mock";
import {Content} from "./components/content";

import {TopBar} from "./components/top";
import {BottomBar} from "./components/footer";
import {loadNavigations} from "./utils/resources/navigations";

import {connect} from "react-redux";
import {compose} from "redux";
import {loadNavigationsAction} from "./utils/redux/actions/navigations";
import {createLink} from "./utils/greateLink";

import history from './utils/history';

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

    static getElements = (item) => item ? item.elements : false;
    static links = (navigation) => {
        return Navigation.getElements(navigation) || [];
    }
}

function App (props) {


    const [navigations, setNavigations] = useState(null)

    useEffect(() => {
        console.log(props.navigations);
        props.loadNavigationsAction();
        !navigations && loadNavigations().then((data)=>{
            setNavigations(data)
        });
    });


    const topNavigation = navigations && navigations.find( nav => nav.entity.name === 'topNavigation' );
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

                    topNavigation && <div style={{ backgroundColor: '#eeeeee'}}>
                        <Switch>
                        {
                            topNavigation &&
                            topNavigation.elements &&
                            topNavigation.elements.map(
                                (linkItem) => <Route
                                    key={linkItem.id}
                                    path={'/'+createLink(linkItem.entity.name)}
                                >
                                    <Content linkItem={linkItem} link={linkItem.entity.name}/>
                                </Route>
                            )
                        }

                    { links.map( (link, i) =>
                        <Route
                            key={i}
                            path={'/'+createLink(link)}
                        >
                             <Content link={link}/>
                        </Route>
                    )}
                        <Redirect
                            to={createLink(links[0])}
                        />
                        </Switch>
                    </div>
                }
                footer={<BottomBar/>}
            />

            </ThemeProvider>
        </Router>
    );
}

const mapStateToProps = (state, ownProps) => ({
    navigations: state.navigations.navigations
});

export default compose(connect(
    mapStateToProps, {
        loadNavigationsAction
    }
))(App);
