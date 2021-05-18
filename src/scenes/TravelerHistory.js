import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DialogBox from '../components/DialogBox/DialogBox';
import Scenario from '../components/Scenario/Scenario';

const travelerHistory = () => {
  return (
    <>
      <Scenario scene="map" />
      <CSSTransition in appear timeout={1600} classNames="fade">
        <DialogBox
          text={[
            'Tired of a long journey from overseas',
            'Where others perished, you thrived.'
          ]}
          speed={10}
          eraseSpeed={0}
          typingDelay={300}
          speechFinished={() => {}}
        />
      </CSSTransition>
    </>
  );
}

export default travelerHistory;
