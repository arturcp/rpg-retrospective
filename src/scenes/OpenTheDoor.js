import React from 'react';
import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';

import './mentor-farewell.scss'

const MentorFarewell = (props) => {
  const { character } = props;

  return (
    <>
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
        Use the keys...
      </div>
    </>
  );
}

export default MentorFarewell;
