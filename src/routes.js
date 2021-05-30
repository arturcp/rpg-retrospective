import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from './pages/home/home';
import SpeedTest from './pages/speed-test/speed-test';
import CommonRoom from './pages/common-room/common-room';
import Admin from './pages/admin/admin';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/" component={SpeedTest} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/common-room" component={CommonRoom} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
