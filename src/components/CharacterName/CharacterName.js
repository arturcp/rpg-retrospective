import React, { useEffect, useRef } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import 'antd/dist/antd.css';
import './styles.scss';

const { Search } = Input;

const CharacterName = (props) => {
  const inputRef = useRef(null);

  const { character } = props;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="character-name-container scale-in-center">
      <h2>Give a name to your character</h2>
      <Search
        ref={inputRef}
        placeholder={`Enter your ${character.title.toLowerCase()}'s name`}
        enterButton="Save"
        size="large"
        onSearch={name => {
          if (name.trim().length > 0) {
            props.onCharacterNameSaved(name)
            props.onClick();
          }
        }}
      />
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    onCharacterNameSaved: (name) => dispatch({ type: actionTypes.SAVE_CHARACTER_NAME, name: name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterName);
