import React, { useState } from 'react';
import { connect } from 'react-redux';

import { STAGES } from './homeConstants';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import CharacterSelection from '../../components/CharacterSelection/CharacterSelection';

import Prologue from '../../scenes/Prologue';
import TravelerHistory from '../../scenes/TravelerHistory';
import MeetTheMentor from '../../scenes/MeetTheMentor';
import MentorIntroduction from '../../scenes/MentorIntroduction';
import MentorFarewell from '../../scenes/MentorFarewell';
import OpenTheDoor from '../../scenes/OpenTheDoor';
import Earthquake from '../../scenes/Earthquake';

const Home = (props) => {
  const [stage, setStage] = useState(STAGES.ASK_FOR_USER_NAME)
  const [stageIndex, setStageIndex] = useState(0)

  const stages = [
    STAGES.ASK_FOR_USER_NAME,
    STAGES.CHARACTER_SELECTION,
    STAGES.PROLOGUE,
    STAGES.TRAVELER_STORYLINE,
    STAGES.MEET_THE_MENTOR,
    STAGES.MENTOR_INTRODUCTION,
    STAGES.MENTOR_FAREWELL,
    STAGES.OPEN_THE_DOOR,
    STAGES.EARTHQUAKE,
  ]

  const nextStage = () => {
    const nextIndex = stageIndex + 1;
    setStageIndex(nextIndex);
    setStage(stages[nextIndex]);
  }

  const { data } = props;
  const { character } = data;

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
        <Prologue character={character} onClick={nextStage}/>
      )}

      {stage === STAGES.TRAVELER_STORYLINE && (
        <TravelerHistory character={character} onSpeechEnd={nextStage} />
      )}

      {stage === STAGES.MEET_THE_MENTOR && (
        <MeetTheMentor character={character} onSceneEnd={nextStage} />
      )}

      {stage === STAGES.MENTOR_INTRODUCTION && (
        <MentorIntroduction character={character} onSceneEnd={nextStage} />
      )}

      {stage === STAGES.MENTOR_FAREWELL && (
        <MentorFarewell character={character} onSceneEnd={nextStage} />
      )}

      {stage === STAGES.OPEN_THE_DOOR && (
        <OpenTheDoor character={character} onSceneEnd={nextStage} />
      )}

      {stage === STAGES.EARTHQUAKE && (
        <Earthquake character={character} onSceneEnd={nextStage} />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps, null)(Home);
