import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DialogBox from '../components/DialogBox/DialogBox';
import Scenario from '../components/Scenario/Scenario';

const travelerHistory = (props) => {
  const { onSpeechEnd, character } = props;
  const pronoun = character.gender === 'male' ? 'he' : 'she';
  const objectPronoun = character.gender === 'male' ? 'him' : 'her';

  return (
    <>
      <CSSTransition in appear timeout={600} classNames="fade">
        <>
          <Scenario scene="map" />
          <DialogBox
            text={[
              `<pause for=2000>Through the mists of Demon Wood, and the stiffling sands of Moffrock, ${pronoun} travelled.`,
              `Where others perished, ${pronoun} thrived.`,
              `At every corner, whispers of a mystical gathering were getting louder and louder, until ${pronoun} could no longer ignore it.`,
              `If the world was in need, ${pronoun} would be there to provide for it.`,
              `<pause for=1000>Tired of a long journey from overseas, the ${character.title.toLowerCase()}, whose fame preceded ${objectPronoun}, has finally found what ${pronoun} was looking for.`,
            ]}
            speed={10}
            eraseSpeed={0}
            typingDelay={300}
            speechFinished={onSpeechEnd}
          />
        </>
      </CSSTransition>
    </>
  );
}

export default travelerHistory;
