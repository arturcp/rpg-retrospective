import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import DialogBox from '../components/DialogBox/DialogBox';

import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import { characters } from '../domain/characters';
import CONSTANTS from '../domain/constants';

const meetTheMentor = (props) => {
  const character = characters[props.characterClass];

  return (
    <>
      <Scenario scene="gateway">
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={true}
          initialData={{
            position: { x: 10, y: 210 },
            direction: CONSTANTS.DIRECTIONS.RIGHT,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
          movementsRestrictions={{
            directions: ['left', 'right'],
            maxX: 374,
            minX: 0,
          }}
        />
      </Scenario>

      <CSSTransition in appear timeout={600} classNames="fade">
        <DialogBox
          text={[
            'teste'
          ]}
          speed={10}
          eraseSpeed={0}
          typingDelay={300}
          speechFinished={() => {}}
        />
      </CSSTransition>
    </>
  )
};

const mapStateToProps = state => {
  return {
    characterClass: state.character.class
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(meetTheMentor);
