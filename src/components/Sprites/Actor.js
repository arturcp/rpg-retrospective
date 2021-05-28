import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sprite from './Sprite';
import './styles.scss'

const Actor = (props) => {
  const [lifePercentage, setLifePercentage] = useState(0);
  const [lifeColor, setLifeColor] = useState('');

  const {
    image, data, step, direction, position,
  } = props;

  const { width, height } = data;

  if (lifePercentage === 0) {
    const newLifePercentage = Math.random() * 80 + 20;
    setLifePercentage(newLifePercentage);
    setLifeColor(newLifePercentage < 40 ? '#ff8c9c' : '#8cff8c');
  }

  const healthBar = () => (
    <div className="health-bar-container" style={{ top: position.y - 15, left: position.x }}>
      <div className="health-bar" style={{ width: lifePercentage + '%', backgroundColor: lifeColor }}></div>
    </div>
  );

  return (
    <div className="sprite-container">
      {healthBar()}
      {/* <span style={{ top: position.y - 25, left: position.x }}>nome</span> */}
      <Sprite
        image={image}
        position={position}
        data={{
          x: step * width,
          y: direction * height,
          width,
          height,
        }}
      />
    </div>
  );
};

Sprite.propTypes = {
  // Image is and object that represents a sprite.
  // To import a sprite, you can use the `import`:
  //
  // import diegoSprite from '../../images/sprites/diego.png';
  //
  // diegoSprite, in this example, can be used in the
  // image property.
  image: PropTypes.string,

  // Position is where the div with the sprite will be
  // displayed in the screen. It has an absolute position,
  // which means that the expected keys in the hash are:
  //
  // * x: horizontal position where the div with the sprite
  //      starts.
  // * y: vertical position where the div with the sprite
  //      starts.
  position: PropTypes.object,

  // Data contains information about the part of the
  // sprite that is displayed. The valid keys of this
  // hash are:
  //
  // * width: width of the visible area of the sprite.
  // * height: width of the visible area of the sprite.
  //
  // An important difference from Actor and Sprite is
  // that x and y will be calculated here, it is not
  // explicitly defined in the Actor component.
  data: PropTypes.object,

  // Sprites consist of a list of different movements
  // an image can make during the animation. Each
  // movement in the same row is a step.
  //
  // In a 4x3 matrix that represents a sprite, the
  // steps are:
  //
  // [0, 1, 2],
  // [0, 1, 2],
  // [0, 1, 2],
  // [0, 1, 2],
  //
  // The start value is always 0.
  step: PropTypes.number,

  // The sprites used in this project follow a
  // convention. In the first row, all images are
  // looking down. In the second, they are looking left,
  // in the third they are looking right and in the
  // fourth they are looking up. With this convention, we
  // can map the directions to numbers to calculate the
  // y position of the visible area in the sprite.
  //
  // The directions map lies in the use-walk hook and is
  // as follows:
  //
  // {
  //    down: 0,
  //    left: 1,
  //    right: 2,
  //    up: 3,
  // }
  direction: PropTypes.number,
};

export default Actor;
