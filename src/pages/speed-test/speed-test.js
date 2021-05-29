import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { characters } from '../../domain/characters';
import { Redirect } from "react-router-dom";

const SpeedTest = (props) => {
  const [stage, setStage] = useState('initial');

  const names = ['Artur', 'Kátia', 'Phoebe'];
  const characterNames = ['Legolas', 'Gandalg', 'Lagertha'];
  const types = ['female-archer', 'male-wizard', 'female-assassin'];

  const nameIndex = Math.floor(Math.random() * (3 - 0) + 0);
  const typeIndex = Math.floor(Math.random() * (3 - 0) + 0);
  const characterNameIndex = Math.floor(Math.random() * (3 - 0) + 0);

  const onClickHandler = () => {
    const {
      onUserNameSaved,
      onSelectCharacterHandler,
      onCharacterNameSaved,
    } = props;

    onUserNameSaved(names[nameIndex]);
    onSelectCharacterHandler(types[typeIndex]);
    onCharacterNameSaved(characterNames[characterNameIndex]);

    setStage('filled');
  }

  console.log(props.state);
  return (
    <>
      { stage === 'initial' && (
        <button onClick={onClickHandler}>Next</button>
      ) }

      { stage === 'filled' && (
        <>
          <h1>Redirecionando...</h1>
          <Redirect to="common-room" />
        </>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    state: state,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUserNameSaved: (name) => dispatch({ type: actionTypes.SAVE_USER_NAME, name: name }),
    onSelectCharacterHandler: (characterType) => {
      const character = characters[characterType];
      dispatch({ type: actionTypes.SAVE_CHARACTER, characterType, character })
    },
    onCharacterNameSaved: (name) => dispatch({ type: actionTypes.SAVE_CHARACTER_NAME, name: name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeedTest);
