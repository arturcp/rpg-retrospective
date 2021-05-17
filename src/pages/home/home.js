import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import CharacterSelection from '../../components/CharacterSelection/CharacterSelection';
import CharacterName from '../../components/CharacterName/CharacterName';

const Home = () => {
  const [stage, setStage] = useState('initial')

  const changeStage = (newStage) => {
    setStage(newStage);
  }

  return (
    <div>
      <Header />
      {stage === 'initial' && (
        <Login onClick={() => { changeStage('loggedIn') }} />
      )}

      {stage === 'loggedIn' && (
        <CharacterSelection onClick={() => { changeStage('characterSelected') }} />
      )}

      {stage === 'characterSelected' && (
        <CharacterName onClick={() => { changeStage('characterNameSaved') }} />
      )}
    </div>
  );
}

export default Home;
