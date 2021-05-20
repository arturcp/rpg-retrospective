import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group';
import Dialogs from '../containers/Dialogs/Dialogs';

import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CharacterName from '../components/CharacterName/CharacterName';
import CONSTANTS from '../domain/constants';
import { npcs } from '../domain/characters';

export default class MentorIntroduction extends Component {
  state = {
    stage: 'mentor-speech',
  }

  render() {
    const { character, onSceneEnd } = this.props;
    const npc = npcs[0];
    const { stage } = this.state;

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
        </Scenario>

        {stage === 'mentor-speech' && (
          <CSSTransition in appear timeout={600} classNames="fade">
            <Dialogs
              dialogsFinished={() => this.setState({ stage: 'character-name' })}
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

        {stage === 'character-name' && (
          <CharacterName character={character} onClick={onSceneEnd} />
        )}
      </>
    )
  }
}
