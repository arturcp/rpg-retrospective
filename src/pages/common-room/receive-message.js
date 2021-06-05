export const receiveMessage = (data, options) => {
  switch (data.type) {
    case 'client-connected':
      return requestGameConnection(data, options);
    case 'new-player':
      return redrawAllPlayers(data, options);
    case 'disconnected':
      return disconnect(data, options);
    case 'reset':
      return reset(data, options);
    case 'player-moved':
      return movePlayer(data, options);
    case 'player-disconnected':
      return redrawAllPlayers(data, options);
    case 'you-were-disconnected':
      alert('You were disconnected');
      return { players: [], showModal: false, connected: false };
    case 'quiz-started':
      const participants = [];

      Object.keys(data.message).forEach((characterName, index) => {
        const character = data.message[characterName];

        if (character && character.quiz) {
          const { theme, option1, option2, option3, option4 } = character.quiz

          // The player should not see his/her theme and options
          // during the quiz.
          if (character.userID !== options.userID) {
            participants.push({
              playerName: options.userName,
              characterName: characterName,
              theme,
              option1,
              option2,
              option3,
              option4,
            })
          }
        }
      });
      return { showQuiz: true, quiz: { ...options.quiz, participants } }
    case 'quiz-results':
      return { quizResults: data.message.players };
    default:
      return {};
  }
};

const requestGameConnection = (data, options) => {
  const { character, characterType, sendMessage, userName } = options;

  console.log('Connected!: ', data);
  sendMessage('game-connection-request', {
    userID: data.userID,
    userName: userName,
    position: { x: 175, y: 433 },
    direction: 2,
    step: 1,
    character: {
      name: character.name,
      type: characterType,
    }
  });

  return { userID: data.userID }
};

const redrawAllPlayers = (data, options) => {
  return { players: data.message };
}

const movePlayer = (data, options) => {
  const { players } = options;

  const currentPlayers = {...players};
  const characterName = data.message.character.name;
  currentPlayers[characterName] = data.message;
  return { players: currentPlayers };
}

const disconnect = (data, options) => {}
const reset = (data, options) => {}
