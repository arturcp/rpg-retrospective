import React, { Component } from 'react';
import { Shake } from 'reshake'
import Scenario from '../components/Scenario/Scenario';
import Player from '../components/Sprites/Player';
import CONSTANTS from '../domain/constants';

export default class Earthquake extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.onSceneEnd();
    }, 5000);
  }

  render() {
    const { character } = this.props;

    return (
      <Shake
        h={5}
        v={5}
        r={3}
        dur={300}
        int={10}
        max={100}
        fixed={true}
        fixedStop={false}
        freez={false}>
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
      </Shake>
    )
  }
}
