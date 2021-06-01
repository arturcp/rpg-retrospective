import React, { useEffect } from 'react';
import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';
import GlitchClip from 'react-glitch-effect/core/GlitchClip';

const BreakingTheDoor = (props) => {
  useEffect(() => {
    setTimeout(() => props.onSceneEnd(), 4000);
  }, [props]);

  const { character } = props;

  return (
    <GlitchClip>
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
    </GlitchClip>
  )
};

export default BreakingTheDoor;
