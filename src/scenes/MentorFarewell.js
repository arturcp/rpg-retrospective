import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Dialogs from '../containers/Dialogs/Dialogs';
import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';
import { npcs } from '../domain/characters';

import './mentor-farewell.scss'

const MentorFarewell = (props) => {
  const { character, onSceneEnd } = props;
  const npc = npcs[0];
  const inputRef = useRef(null);

  return (
    <>
      <Scenario scene="gateway">
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={false}
          initialData={{
            position: { x: 215, y: 225 },
            direction: CONSTANTS.DIRECTIONS.RIGHT,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
        />

        <div className="npc" ref={inputRef}>
          <Player
            image={npc.avatar}
            data={CONSTANTS.SPRITE_DIMENSIONS}
            allowInteraction={false}
            initialData={{
              position: { x: 255, y: 225 },
              direction: CONSTANTS.DIRECTIONS.LEFT,
              step: CONSTANTS.MOVEMENT.STOPPED,
            }}
          />
        </div>
      </Scenario>

      <CSSTransition in appear timeout={600} classNames="fade">
        <Dialogs
          dialogsFinished={() => {
            inputRef.current.classList.add('slide-out-blurred-right')
            setTimeout(() => {
              onSceneEnd();
            }, 2000)
          }}
          dialogs={
            [
              {
                character_type:  'NPC',
                npc_id: 1,
                paragraphs: [
                  `It is an honor to make your acquantaince, ${character.name} the ${character.title}`,
                  `I have heard your name before. You fought the Battle of the Meadow, and unhinged the plot that Briar The Fourth concocted to take down the Mountains of Hagwar.`,
                  `Providence has sent you here today. Chaos must be averted, but my presence is required elsewhere. I salute you and bless the path that lies ahead of you.`,
                  `Hurl the door and meet your fate, ${character.name} the ${character.title}`,
                  `We will see each other before the end. Farewell.`
                ]
              }
            ]
          }
        />
      </CSSTransition>
    </>
  );
}

export default MentorFarewell;
