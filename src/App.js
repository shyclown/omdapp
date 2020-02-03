import React from 'react';
import './App.css';
import UniversalPanel from "./universal/UniversalPanel";
import {HashRouter as Router, Link, Switch, Route, Redirect} from "react-router-dom";


import {links} from "./utils/mock";
import {Content} from "./components/content";

import {TopBar} from "./components/top";
import {BottomBar} from "./components/footer";




const createLink = (str) => str.split(' ').join('_');

function App() {
    return (
        <Router>

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
        </Router>
    );
}

export default App;
