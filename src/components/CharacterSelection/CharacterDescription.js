import React from 'react';
import Player from '../Sprites/Player';
import CONSTANTS from '../../domain/constants';

const characterDescription = (props) => {
  const { character } = props;

  return (
    <div className="character-description">
      <h2 className="title">{character.title}</h2>
      {character.description.map(paragraph => <div className="description-paragraph">{paragraph}</div>)}
      <div className="player-area">
        <Player
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={false}
          initialData={{
            position: { x: 284, y: 34 },
            direction: CONSTANTS.DIRECTIONS.DOWN,
            step: CONSTANTS.MOVEMENT.STOPPED,
          }}
        />
      </div>
    </div>
  )
}

export default characterDescription;
