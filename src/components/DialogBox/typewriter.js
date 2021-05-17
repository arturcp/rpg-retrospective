/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
// https://css-tricks.com/snippets/css/typewriter-effect/
// set up text to print, each item in array is new line

const typewriter = (dialogBox, text, onSpeechEnd) => {
  const regex = new RegExp(/<pause for=\d+>/g);
  const sentences = text.split(regex);
  const pauses = text.match(regex);
  let pauseIndex = 0;
  const typeDelay = 30; // time delay of print out
  let currentSentenceIndex = 0; // start printing array at this posision
  let currentSentenceLength = sentences[0].length; // the length of the text array

  let characterPosition = 0; // initialise text position
  let sContents = ''; // initialise contents variable
  let lastSentence = '';

  const typeNextLetter = (container) => {
    characterPosition += 1;
    setTimeout(() => { write(container); }, typeDelay);
  };

  const moveToNextSentence = (container) => {
    const currentPause = pauses[pauseIndex];
    pauseIndex += 1;
    const pauseLength = currentPause ? currentPause.match(/\d+/g) : 500;
    currentSentenceLength = sentences[currentSentenceIndex].length;
    lastSentence = container.innerHTML;
    setTimeout(() => { write(container); }, pauseLength);
  };

  const write = (container) => {
    if (container.getAttribute('mode') === 'flat') {
      return;
    }

    sContents = ' ';

    sContents = `${lastSentence}${sContents}${sentences[currentSentenceIndex].substring(0, characterPosition)}`;
    container.innerHTML = sContents;

    if (characterPosition === currentSentenceLength) {
      characterPosition = 0;
      currentSentenceIndex += 1;

      if (currentSentenceIndex !== sentences.length) {
        moveToNextSentence(container);
      } else if (typeof onSpeechEnd === 'function') {
        onSpeechEnd();
      }
    } else {
      typeNextLetter(container);
    }
  };

  write(dialogBox);
};

export default typewriter;
