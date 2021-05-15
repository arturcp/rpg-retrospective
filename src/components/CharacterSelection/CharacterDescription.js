import React from 'react';

const characterDescription = (props) => {
  const { character } = props;

  return (
    <div className="character-description">
      {character.description}
    </div>
  )
}

export default characterDescription;
