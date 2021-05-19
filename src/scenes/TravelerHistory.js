import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DialogBox from '../components/DialogBox/DialogBox';
import Scenario from '../components/Scenario/Scenario';

const travelerHistory = (props) => {
  const { onSpeechEnd } = props;
  return (
    <>
      <CSSTransition in appear timeout={600} classNames="fade">
        <>
          <Scenario scene="map" />
          <DialogBox
            text={[
              '<pause for=2000>Tired of a long journey from overseas',
              'Where others perished, you thrived.'
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
