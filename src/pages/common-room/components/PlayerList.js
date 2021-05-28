import React from 'react';
import Player from '../../components/Sprites/Player';
import Actor from '../../components/Sprites/Actor';
import CONSTANTS from '../../domain/constants';
import { characters } from '../../domain/characters';

const PlayerList = (props) => {
  const { player, userID, sendMessage } = props;

  const character = characters[player.character.type];
  const currentPlayer = player.userID === userID;

  console.log(`Drawing ${player.character.name} at ${player.position.x}, ${player.position.y} (${player.direction})`)

  return (
    <div key={player.character.name}>
      {currentPlayer && (
        <Player
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
        />
      )}

      {!currentPlayer && (
        <Actor
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          step={player.step}
          direction={player.direction}
          position={player.position}
        />
      )}
    </div>
  )
}

export default PlayerList;
