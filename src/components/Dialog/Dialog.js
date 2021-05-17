import React from 'react';
import DialogBox from '../DialogBox/DialogBox';
import { npcs } from '../../domain/characters';

const dialog = (props) => {
  const {
    character, dialog: currentDialog, speechFinished,
  } = props;

  const getSpeaker = (npcId) => {
    if (currentDialog.character_type === 'PC') {
      return character;
    }

    return npcs.find((npc) => npc.id === npcId);
  };

  const speaker = getSpeaker(currentDialog.npc_id);
  const avatarDirection = currentDialog.character_type === 'PC' ? 'left' : 'right';

  return (
    <DialogBox
      avatar={speaker.image_url}
      name={speaker.name}
      text={currentDialog.paragraphs}
      labelColor={speaker.main_color}
      speed={100000}
      eraseSpeed={0}
      typingDelay={1300}
      speechFinished={speechFinished}
      avatarDirection={avatarDirection}
    />
  );
};

export default dialog;
