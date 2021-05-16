import React from 'react';

const characterDescription = (props) => {
  const { character } = props;

  return (
    <div className="character-description">
      <h2 className="title">{character.title}</h2>
      {character.description.map(paragraph => <div className="description-paragraph">{paragraph}</div>)}
    </div>
  )
}

export default characterDescription;
