import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Roster from './Roster';
import Schedule from './Schedule';
import NotFound from './NotFound';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
      <Route component={NotFound}/>
    </Switch>
  </main>
);

export default Main;