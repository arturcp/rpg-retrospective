import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

const Home = () => {
  const [stage, setStage] = useState('initial')

  const changeStage = (newStage) => {
    setStage(newStage);
  }

  return (
    <div>
      <Header />
      {stage === 'initial' && (
        <Login onClick={() => { changeStage('loggedIn') }}/>
      )}

      {stage === 'loggedIn' && (
        <h1>Choose your character</h1>
      )}
    </div>
  );
}

export default Home;
