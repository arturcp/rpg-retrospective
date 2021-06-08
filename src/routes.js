import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home/home';
// import SpeedTest from './pages/speed-test/speed-test';
import CommonRoom from './pages/common-room/common-room';
import Admin from './pages/admin/admin';
import QuizResults from './pages/quiz-results/quiz-results';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* Use this route to test the common-room without having to navigate all the way
      through the game */}
      {/* <Route exact path="/" component={SpeedTest} /> */}
      <Route exact path="/control" component={Admin} />
      <Route exact path="/common-room" component={CommonRoom} />
      <Route exact path="/quiz-results" render={(props) => <QuizResults {...props} /> } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
