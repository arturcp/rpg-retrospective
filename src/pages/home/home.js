import React from 'react';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

const home = () => (
  <div>
    <Header />
    <Login onClick={() => { console.log('clicou') }}/>
  </div>
);

export default home;


