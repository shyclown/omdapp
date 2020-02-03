import React from 'react';
import './App.css';
import UniversalPanel from "./universal/UniversalPanel";
import {ThemeProvider} from "@material-ui/core/styles";
import {HashRouter as Router, Link, Switch, Route, Redirect} from "react-router-dom";


import theme from './style/theme';


import {links} from "./utils/mock";
import {Content} from "./components/content";

import {TopBar} from "./components/top";
import {BottomBar} from "./components/footer";




const createLink = (str) => str.split(' ').join('_');

function App() {
    return (
        <Router>

            <ThemeProvider theme={theme}>
        <div style={{height: '100vh', backgroundColor: '#666'}}>

            <UniversalPanel singlePanel
                toolbar={<TopBar/>}
                content={
                    <div>
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
        </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
