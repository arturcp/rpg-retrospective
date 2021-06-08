import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Button } from 'antd';
import Actor from '../../components/Sprites/Actor';
import Header from '../../components/Header/Header';
import { characters } from '../../domain/characters';
import CONSTANTS from '../../domain/constants';

import 'antd/dist/antd.css';
import './styles.scss'

const client = new W3CWebSocket(process.env.REACT_APP_SERVER_URL);

const Admin = () => {
  const [connected, setConnectedStatus] = useState(false);

  /* Players - Example:
    {
      'Ragnar': {
        character: { name: "Legolas", type: "male-wizard"},
        direction: 2,
        position: { x: 175, y: 433 },
        quiz: { theme: "1", option1: "2", option2: "3", option3: "4", option4: "5", answer: "4" },
        step: 1,
        userID: "3977a357-9d97",
        userName: "Carlos"
      }
    }
  */
  const [players, setPlayers] = useState({});

  /* Quiz Answers Example:
    {
      'José': [
        { answer: 'blue', characterName: 'Ragnar' },
        { answer: '42', characterName: 'Floki' },
      ]
    }
  */
  const [quizAnswers, saveQuizAnswer] = useState({});

  client.onopen = () => {
    console.log(`Connected to ${process.env.REACT_APP_SERVER_URL}`);
    setConnectedStatus(true);
  };

  client.onerror = () => {
    console.log('Error trying to connect to server');
  };

  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    if (dataFromServer.type === 'client-connected') {
      client.send(JSON.stringify({ type: 'players-list-request' }));
    }

    if (dataFromServer.type === 'players-list' || dataFromServer.type === 'player-disconnected') {
      const newPlayers = dataFromServer.message;
      setPlayers(newPlayers);
    }

    if (dataFromServer.type === 'quiz-ready') {
      const {
        characterName,
        theme,
        themeOption1,
        themeOption2,
        themeOption3,
        themeOption4,
        quizAnswer,
      }= dataFromServer.message;

      const newPlayerList = { ...players }
      newPlayerList[characterName].quiz = {
        theme,
        option1: themeOption1,
        option2: themeOption2,
        option3: themeOption3,
        option4: themeOption4,
        answer: quizAnswer
      }

      setPlayers(newPlayerList);
    }

    if (dataFromServer.type === 'quiz-answered') {
      const { userName, answers } = dataFromServer.message;
      const newState = { ...quizAnswers }
      if (!newState[userName]) {
        newState[userName] = answers;
      }

      saveQuizAnswer(newState);
    }
  };

  const startQuiz = () => {
    document.querySelector('[data-start-quiz]').classList.add('hide');
    client.send(JSON.stringify({
      type: 'quiz-started',
      value: {}
    }));
  };

  const countAnsweredQuizzes = () => {
    let answeredQuizzes = 0;

    Object.keys(players).forEach((key) => {
      const player = players[key];

      if (player) {
        const character = characters[player.character.type];
        if (character && quizAnswers[player.userName]) {
          answeredQuizzes++;
        }
      }
    });

    return answeredQuizzes;
  }

  // Example:
  // {
  //   character: {name: "Gandalf", type: "female-archer"}
  //   direction: 2
  //   position: {x: 175, y: 433}
  //   step: 1
  //   userID: "9182493a-1b54"
  //   userName: "Kátia"
  //   quiz: { "theme": "TV Shows", "option1": "", ... }
  //}
  const showPlayers = () => {
    const list = [];
    let index = 0;
    Object.keys(players).forEach((key) => {
      const player = players[key];
      index += 1;

      if (player) {
        const character = characters[player.character.type];
        const onDisconnectHandler = () => {
          const newQuizAnswers = { ...quizAnswers }
          newQuizAnswers[player.userName] = null;
          saveQuizAnswer(newQuizAnswers);

          client.send(JSON.stringify({
            type: 'disconnect-player',
            value: {
              userID: player.userID,
              characterName: player.character.name,
            }
          }));
        }

        if (character) {
          let quizState = 'pending';

          if (quizAnswers[player.userName]) {
            quizState = 'quiz answered';
          } else if (player.quiz && player.quiz.answer) {
            quizState = 'theme chosen';
          }


          list.push(
            <div key={`player-${index}`} className="player-box">
              <Actor
                image={character.avatar}
                data={CONSTANTS.SPRITE_DIMENSIONS}
                step="1"
                direction="0"
                position={{ x: '95px', y: '15px' }}
              />
              <br /><br /><br />
              <span><b>User:</b> {player.userName}</span><br />
              <span><b>Character:</b> {player.character.name}</span><br />
              <span><b>Quiz:</b> {quizState}</span><br /><br />
              <Button type="default" size="large" onClick={onDisconnectHandler}>
                Disconnect
              </Button>
            </div>
          );
        }
      }
    });

    return list;
  };

  const calculateQuizPoints = (playerName) => {
    let points = 0;

    if (quizAnswers[playerName]) {
      quizAnswers[playerName].forEach((data) => {
        const { answer, characterName: quizOwnerName } = data;

        if (players[quizOwnerName]) {
          const correctAnswer = players[quizOwnerName].quiz.answer;
          if (answer === correctAnswer) {
            points++;
          }
        }
      });
    }

    return points;
  }

  const showQuizAnswers = () => {
    const list = [];
    let index = 0;
    Object.keys(quizAnswers).forEach((playerName) => {
      index += 1;

      const points = calculateQuizPoints(playerName);

      list.push(
        <div key={`quiz-answer-${index}`} className="quiz-answer-card" data-quiz-answer-player={playerName} data-quiz-answer-points={points}>
          <h2>{playerName}</h2>
          <b>Points: </b> {points}
        </div>
      )
    });

    return (
      <div>
        <h2>{quizAnswers.userName}</h2>
        {list}
      </div>
    );
  };

  const sendQuizResults = () => {
    const elements = document.querySelectorAll('.quiz-answer-card');
    const list = [];
    elements.forEach(element => {
      const playerName = element.getAttribute('data-quiz-answer-player');
      const points = parseInt(element.getAttribute('data-quiz-answer-points'));
      list.push({ playerName, points });
    });

    client.send(JSON.stringify({
      type: 'quiz-results-ready',
      value: {
        players: list.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0)),
      }
    }));
  }

  const answeredQuizzesCounter = countAnsweredQuizzes();
  const playersToShow = showPlayers();

  return (
    <div className="admin">
      <Header />

      <h1>Admin</h1>

      <h2>
        <span className={connected ? 'green-semaphore semaphore' : 'red-semaphore semaphore'}>
        </span>
        Connected
      </h2>

      <Button type="default" size="large" onClick={startQuiz} data-start-quiz>
        Start Quiz
      </Button>

      <hr />

      <div className="players-container">
        {playersToShow}
      </div>

      <div className="quiz-answers-container">
        {Object.keys(quizAnswers).length > 0 && (
          <h2>Pontuação do quiz</h2>
        )}
        {showQuizAnswers()}

        {answeredQuizzesCounter > 0 && answeredQuizzesCounter === playersToShow.length && (
          <div className="show-quiz-results-container">
            <Button type="primary" size="large" onClick={sendQuizResults}>
              Show quiz results
            </Button>
          </div>
        )}
      </div>
    </div>
  )
};

export default Admin;
