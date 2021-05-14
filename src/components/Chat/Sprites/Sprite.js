import React from 'react';
import PropTypes from 'prop-types';

const sprite = (props) => {
  const { data, image, position } = props;
  const {
    x, y, width, height,
  } = data;

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no repeat',
        backgroundPosition: `-${x}px -${y}px`,
      }}
    />
  );
};

sprite.propTypes = {
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
  // * x: horizontal position where the visible are of
  //      the sprite starts.
  // * y: vertical position where the visible are of
  //      the sprite starts.
  // * width: width of the visible area of the sprite.
  // * height: width of the visible area of the sprite.
  data: PropTypes.object,
};

export default sprite;
