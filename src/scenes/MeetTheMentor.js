import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Dialogs from '../containers/Dialogs/Dialogs';

import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';
import { npcs } from '../domain/characters';

import './meet-the-mentor.scss';

const MeetTheMentor = (props) => {
  const [stage, setStage] = useState('hint');
  const { character } = props;
  const npc = npcs[0];

  return (
    <>
      <Scenario scene="gateway">
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={stage === 'hint'}
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
            x: 202,
            arrived: () => { setStage('mentor-speech') },
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

      {stage === 'hint' && (
        <div className="hint-to-player">
          Go talk to the misterious creature ahead
        </div>
      )}

      {stage === 'mentor-speech' && (
        <CSSTransition in appear timeout={600} classNames="fade">
          <Dialogs
            dialogsFinished={() => {}}
            dialogs={
              [
                {
                  character_type:  'NPC',
                  npc_id: 1,
                  paragraphs: [
                  '<pause for=1200>Halt, stranger. <pause for=2200> A mortal danger lurks around and you have found us in the throes of a battle for our very existence.',
                  'But I can feel your prowess from afar, you have come from a distant land in the right time. There are others of your kind beyond that walloping gate.',
                  'Cross it at your own risk. Uncanny power struts towards us and the sands of time seep through the hourglass.',
                  'Go and meet the others. All the hopes of human kind depend on this meeting.',
                  'However, I believe some introductions are necessary first. I am called by many names, but you can know me as Hellorah, the keeper of the Lethorians.',
                  'How may I call you?',
                  ]
                }
              ]
            }
          />
        </CSSTransition>
      )}
    </>
  )
};

export default MeetTheMentor;
