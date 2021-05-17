import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import CharacterSelection from '../../components/CharacterSelection/CharacterSelection';
import Dialogs from '../../containers/Dialogs/Dialogs';

// import CharacterName from '../../components/CharacterName/CharacterName';

const Home = () => {
  const [stage, setStage] = useState('initial')

  const changeStage = (newStage) => {
    setStage(newStage);
  }

  console.log(stage);
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
        // <CharacterName onClick={() => { changeStage('characterNameSaved') }} />
        <CSSTransition in appear timeout={600} classNames="fade">
          <Dialogs
            dialogsFinished={() => { changeStage('mentorDialogFinished') }}
            dialogs={
              [
                {
                  character_type:  'NPC',
                  npc_id: 1,
                  paragraphs: [
                  'Hello, stranger. A great danger lurks around and you have come in the right time.',
                  'There are others like you waiting ahead, all the hopes from human kind lie on this meeting.',
                  'However, I believe some introductions are necessary first. I am Hellorah, the last of the Lethorians.',
                  'How may I call you?',
                  ]
                }
              ]
            }
          />
        </CSSTransition>
      )}
    </div>
  );
}

export default Home;
