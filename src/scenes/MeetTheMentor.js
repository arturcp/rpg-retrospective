import React from 'react';

import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';
import { npcs } from '../domain/characters';

import './meet-the-mentor.scss';

const MeetTheMentor = (props) => {
  const { character, onSceneEnd } = props;
  const npc = npcs[0];

  return (
    <>
      <Scenario scene="gateway">
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={true}
          initialData={{
            position: { x: 10, y: 225 },
            direction: CONSTANTS.DIRECTIONS.RIGHT,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
          movementsRestrictions={{
            directions: ['left', 'right'],
            maxX: 215,
            minX: 0,
          }}
          destination={{
            x: 208,
            arrived: () => { onSceneEnd() },
          }}
        />

        <Player
          image={npc.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={false}
          initialData={{
            position: { x: 248, y: 225 },
            direction: CONSTANTS.DIRECTIONS.UP,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
        />
      </Scenario>

      <div className="hint-to-player">
        Go talk to the misterious creature ahead
      </div>
    </>
  )
};

export default MeetTheMentor;
