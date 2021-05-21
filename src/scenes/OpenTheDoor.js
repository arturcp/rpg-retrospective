import React from 'react';
import Konami from 'react-konami-code';
import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';

import './mentor-farewell.scss'

const MentorFarewell = (props) => {
  const { character } = props;

  const konamiAction = () => {
    console.log('deu certo');
  }

  return (
    <>
      {/* The code is left, down, right, d*/}
      <Konami action={konamiAction} code={[37, 40, 39, 68]} />
      <Scenario scene="gateway">
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={false}
          initialData={{
            position: { x: 215, y: 225 },
            direction: CONSTANTS.DIRECTIONS.UP,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
        />
      </Scenario>

      <div className="hint-to-player">
        To open the door, use your power:
      </div>
    </>
  );
}

export default MentorFarewell;
