import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './containers/App/App';
import Map from './containers/Main/MapContainer';
import List from './containers/List/List';
import Detail from './containers/Detail/Detail';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <Route title="Main" path="main" component={Map}/>
            <Route title="List" path="list">
                <IndexRoute component={List}/>
                <Route title="detail" path=":id" component={Detail}/>
            </Route>
        </Route>
    </Router>
);

export default Routes;