import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import CharacterSelection from '../../components/CharacterSelection/CharacterSelection';
import Dialogs from '../../containers/Dialogs/Dialogs';

import CharacterName from '../../components/CharacterName/CharacterName';

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
        <CSSTransition in appear timeout={600} classNames="fade">
          <Dialogs
            dialogsFinished={() => { changeStage('mentorDialogFinished') }}
            dialogs={
              [
                {
                  character_type:  'NPC',
                  npc_id: 1,
                  paragraphs: [
                  'Halt, stranger. <pause for=1200> A mortal danger lurks around and you have found us in the throes of a battle for our very existence.',
                  'But I can feel your prowess from afar, you have come from a distant land in the right time. There are others of your kind beyond that walloping gate.',
                  'Cross it at your own risk. Uncanny power struts towards us and the sands of time seep through the hourglass.',
                  'Go and meet the others. All the hopes of human kind depend on this meeting.',
                  'However, I believe some introductions are necessary first. I am called by many names, but you can know me as Hellorah, the keeper of the Lethorians.',
                  'How may I call you?',
                  ]
                }
              ]
            }
          />
        </CSSTransition>
      )}

      {stage === 'mentorDialogFinished' && (
        <CharacterName onClick={() => { changeStage('characterNamed') }} />
      )}
    </div>
  );
}

export default Home;
