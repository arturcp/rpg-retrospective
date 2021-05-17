import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { characters } from '../../domain/characters';

import 'antd/dist/antd.css';
import './styles.scss';

const { Search } = Input;

const CharacterName = (props) => (
  <div className="character-name-container scale-in-center">
    <h2>Give a name to your character</h2>
    <Search
      placeholder={`Enter your ${characters[props.characterClass].title.toLowerCase()}'s name`}
      enterButton="Save"
      size="large"
      onSearch={name => {
        props.onCharacterNameSaved(name)
        props.onClick();
      }}
    />
  </div>
)

const mapStateToProps = state => {
  return {
    characterName: state.character.name,
    characterClass: state.character.class,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCharacterNameSaved: (name) => dispatch({ type: actionTypes.SAVE_CHARACTER_NAME, name: name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterName);
