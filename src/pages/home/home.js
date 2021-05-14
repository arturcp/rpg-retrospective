import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import CharacterSelection from '../../components/CharacterSelection/CharacterSelection';

const Home = () => {
  const [stage, setStage] = useState('loggedIn')

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
        <CharacterSelection />
      )}
    </div>
  );
}

export default Home;
