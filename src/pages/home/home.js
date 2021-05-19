import React, { useState } from 'react';

import { STAGES } from './homeConstants';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import CharacterSelection from '../../components/CharacterSelection/CharacterSelection';
import CharacterName from '../../components/CharacterName/CharacterName';

import Prologue from '../../scenes/Prologue';
import TravelerHistory from '../../scenes/TravelerHistory';
import MeetTheMentor from '../../scenes/MeetTheMentor';
import MentorIntroduction from '../../scenes/MentorIntroduction';

const Home = () => {
  const [stage, setStage] = useState(STAGES.ASK_FOR_USER_NAME)
  const [stageIndex, setStageIndex] = useState(0)

  const stages = [
    STAGES.ASK_FOR_USER_NAME,
    STAGES.CHARACTER_SELECTION,
    STAGES.PROLOGUE,
    STAGES.TRAVELER_STORYLINE,
    STAGES.MEET_THE_MENTOR,
    STAGES.MENTOR_INTRODUCTION_SPEECH,
    STAGES.ASK_FOR_CHARACTER_NAME,
  ]

  const nextStage = () => {
    setStageIndex(stageIndex + 1);
    setStage(stages[stageIndex]);
  }

  return (
    <div>
      <Header />
      {stage === STAGES.ASK_FOR_USER_NAME && (
        <Login onClick={nextStage} />
      )}

      {stage === STAGES.CHARACTER_SELECTION && (
        <CharacterSelection onClick={nextStage} />
      )}

      {stage === STAGES.PROLOGUE && (
        <Prologue onAnimationEnd={nextStage}/>
      )}

      {stage === STAGES.TRAVELER_STORYLINE && (
        <TravelerHistory />
      )}

      {stage === STAGES.MEET_THE_MENTOR && (
        <MeetTheMentor onSceneEnd={nextStage} />
      )}

      {stage === STAGES.MENTOR_INTRODUCTION_SPEECH && (
        <MentorIntroduction onDialogFinish={nextStage} />
      )}

      {stage === STAGES.ASK_FOR_CHARACTER_NAME && (
        <CharacterName onClick={nextStage} />
      )}
    </div>
  );
}

export default Home;
