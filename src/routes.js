import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home/home';
import CommonRoom from './pages/common-room/common-room';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/common-room" component={CommonRoom} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
