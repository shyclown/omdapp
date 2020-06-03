import React from 'react';
import './App.css';

import config from "./utils/config";
import UniversalPanel from "./universal/UniversalPanel";
import {ThemeProvider} from "@material-ui/core/styles";
import {HashRouter as Router, Link, Switch, Route, Redirect} from "react-router-dom";


import theme from './style/theme';


import {links} from "./utils/mock";
import {Content} from "./components/content";

import {TopBar} from "./components/top";
import {BottomBar} from "./components/footer";
import {loadNavigaitons} from "./utils/resources/navigations";

console.log(config)

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


const createLink = (str) => str.split(' ').join('_');

function App() {



    loadNavigaitons().then(()=>console.log('data'))

    return (
        <Router>

            <ThemeProvider theme={theme}>


            <UniversalPanel
                singlePanel
                toolbar={<TopBar/>}
                content={
                    <div style={{ backgroundColor: '#eeeeee'}}>
                        <Redirect to={createLink(links[0])}/>
                    { links.map( (link, i) =>
                        <Route key={i} path={'/'+createLink(link)}>
                             <Content link={link}/>
                        </Route>
                    )}
                    </div>
                }
                footer={<BottomBar/>}
            />

            </ThemeProvider>
        </Router>
    );
}

export default App;
