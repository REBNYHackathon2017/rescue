import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './containers/App/App';
import Map from './containers/Main/MapContainer';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <Route title="Map" path="main" component={Map}/>
        </Route>
    </Router>
);

export default Routes;