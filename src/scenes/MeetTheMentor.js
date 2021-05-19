import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DialogBox from '../components/DialogBox/DialogBox';

import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';

import './meet-the-mentor.scss';

const meetTheMentor = (props) => {
  const { character } = props;

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

export default meetTheMentor;
