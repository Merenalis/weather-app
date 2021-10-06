import React from 'react';
import Main from './components/Main'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
    <Router>
        <div>
            <Switch>
                <Route path="/zaporizhia">
                    <Main/>
                </Route>
                <Route path="/kyiv">
                    <Main/>
                </Route>
                <Route path="/">
                    <Main/>
                </Route>
            </Switch>
        </div>
    </Router>
    )
}

export default App;
