import React from 'react';
import Main from './components/Main'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

function App() {
    return (
    <Router>
        <div>
            <Switch>
                <Route path="/:city" component={Main}/>
                <Route path="/" component={Main}/>
            </Switch>
        </div>
    </Router>
    )
}

export default App;
