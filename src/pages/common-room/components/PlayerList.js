import React from 'react';
import Player from '../../../components/Sprites/Player';
import Actor from '../../../components/Sprites/Actor';
import CONSTANTS from '../../../domain/constants';
import { characters } from '../../../domain/characters';

const PlayerList = (props) => {
  const { player, userID, sendMessage } = props;

  const character = characters[player.character.type];
  const currentPlayer = player.userID === userID;

  return (
    <div key={player.character.name}>
      {currentPlayer && character && (
        <Player
          showLifeBar
          showName
          name={`${player.character.name} (${player.userName})`}
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={true}
          initialData={{
            position: {
              x: player.position.x,
              y: player.position.y,
            },
            direction: player.direction,
            step: player.step,
          }}
          onMove={(position, direction, step) => {
            sendMessage('player-moved', {
              userID: player.userID,
              position,
              direction,
              step,
              character: player.character
            })
          }}
          movementsRestrictions={{
            directions: ['left', 'right', 'up', 'down'],
            minX: 0,
            minY: 0,
          }}
        />
      )}

      {!currentPlayer && character && (
        <Actor
          showLifeBar
          showName
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          step={player.step}
          direction={player.direction}
          position={player.position}
          name={`${player.character.name} (${player.userName})`}
        />
      )}
    </div>
  )
}

export default PlayerList;
