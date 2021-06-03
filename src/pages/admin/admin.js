import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Button } from 'antd';
import Actor from '../../components/Sprites/Actor';
import Header from '../../components/Header/Header';
import { characters } from '../../domain/characters';
import CONSTANTS from '../../domain/constants';

import 'antd/dist/antd.css';
import './styles.scss'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const Admin = () => {
  const [connected, setConnectedStatus] = useState(false);
  const [players, setPlayers] = useState([]);
  const [quizAnswers, saveQuizAnswer] = useState([]);

  client.onopen = () => {
    setConnectedStatus(true);
  };

  client.onmessage = (message) => {
    console.log('message received');
    const dataFromServer = JSON.parse(message.data);
    if (dataFromServer.type === 'client-connected') {
      client.send(JSON.stringify({ type: 'players-list-request' }));
    }

    if (dataFromServer.type === 'players-list' || dataFromServer.type === 'player-disconnected') {
      const newPlayers = dataFromServer.message;
      setPlayers(newPlayers);
    }

    if (dataFromServer.type === 'quiz-answered') {
      saveQuizAnswer([...quizAnswers, dataFromServer.message]);
    }
  };

  const startQuiz = () => {
    client.send(JSON.stringify({
      type: 'quiz-started',
      value: {}
    }));
  };

  // Example:
  // {
  //   character: {name: "Gandalf", type: "female-archer"}
  //   direction: 2
  //   position: {x: 175, y: 433}
  //   step: 1
  //   userID: "9182493a-1b54"
  //   userName: "Kátia"
  //}
  const showPlayers = () => {
    const list = [];
    let index = 0;
    Object.keys(players).forEach((key) => {
      const player = players[key];
      index += 1;

      if (player) {
        const character = characters[player.character.type];
        const onClickHandler = () => {
          client.send(JSON.stringify({
            type: 'disconnect-player',
            value: {
              userID: player.userID,
              characterName: player.character.name,
            }
          }));
        }

        list.push(
          <div key={`player-${index}`} className="player-box">
            <Actor
              image={character.avatar}
              data={CONSTANTS.SPRITE_DIMENSIONS}
              step="1"
              direction="0"
              position={{ x: '60px', y: '15px' }}
            />
            <br /><br /><br />
            <span><b>User:</b> {player.userName}</span><br />
            <span><b>Character:</b> {player.character.name}</span><br /><br />
            <Button type="default" size="large" onClick={onClickHandler}>
              Disconnect
            </Button>
          </div>
        );
      }
    });

    return list;
  };

  const showQuizAnswers = () => {
    return (
      <div>
        <h2>{quizAnswers.userName}</h2>
        {quizAnswers.map((quizAnswer, index) => (
          <p key={`answer-${index}`}>{quizAnswer.answer}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="admin">
      <Header />

      <h1>Admin</h1>

      <h2>
        <span className={connected ? 'green-semaphore semaphore' : 'red-semaphore semaphore'}>
        </span>
        Connected
      </h2>

      <Button type="default" size="large" onClick={startQuiz}>
        Start Quiz
      </Button>

      <hr />


      {showPlayers()}
      {showQuizAnswers()}
    </div>
  )
};

export default Admin;
