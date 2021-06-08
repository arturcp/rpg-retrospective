import React from 'react';
import Player from '../Sprites/Player';
import { Button } from 'antd';
import CONSTANTS from '../../domain/constants';

import initialImage from '../../images/scenarios/initial.png';

const characterDescription = (props) => {
  const { character, onSelectCharacter, characterType } = props;

  return (
    <div className="character-description">
      <h2 className="title">{character.title}</h2>

      <div className="paragraphs">
        {character.description.map((paragraph, index) => <div key={`description-${index}`} className="description-paragraph">{paragraph}</div>)}
      </div>

      <div className="player-area" style={{ background: `url(${initialImage})`, backgroundSize: '600px 208px' }}>
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={true}
          initialData={{
            position: { x: 284, y: 34 },
            direction: CONSTANTS.DIRECTIONS.DOWN,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
          movementsRestrictions={{
            directions: ['left', 'right', 'up', 'down'],
            minY: 33,
            maxY: 68,
            maxX: 374,
            minX: 0,
          }}
        />
        <div className="keyboard-hint-image"></div>
        <div className="keyboard-hint-text">Hint: use your keyboard</div>
      </div>

      <div className="character-selection-call-to-action">
        <Button type="default" size="large" onClick={() => { onSelectCharacter(characterType) }}>
          Play with the {character.title.toLowerCase()}
        </Button>
      </div>
    </div>
  )
}

export default characterDescription;
