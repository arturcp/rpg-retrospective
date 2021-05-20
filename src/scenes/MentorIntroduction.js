import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Dialogs from '../containers/Dialogs/Dialogs';

const mentorIntroduction = (props) => {
  const { onDialogFinish } = props;

  return (
    <CSSTransition in appear timeout={600} classNames="fade">
      <Dialogs
        dialogsFinished={onDialogFinish}
        dialogs={
          [
            {
              character_type:  'NPC',
              npc_id: 1,
              paragraphs: [
              'Halt, stranger. <pause for=1200>A mortal danger lurks around and you have found us in the throes of a battle for our very existence.',
              'But I can feel your prowess from afar, you have come <br />from a distant land in the right time. There are others of your kind beyond that walloping gate.',
              'Cross it at your own risk. Uncanny power struts towards us and the <br>sands of time seep through the hourglass.',
              'Go and meet the others. All the hopes for the human kind depend on this meeting.',
              'However, I believe some introductions are necessary first. <br>I am called by many names, but you can know me as Hellorah, <br>the keeper of the Lethorians.',
              'How may I call you?',
              ]
            }
          ]
        }
      />
    </CSSTransition>
  )
}

export default mentorIntroduction;
