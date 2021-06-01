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

  client.onopen = () => {
    setConnectedStatus(true);
  };

  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    if (dataFromServer.type === 'new-player') {
      const newPlayers = dataFromServer.message
      setPlayers(newPlayers);
      console.log(newPlayers);
    }
  };

  // Example:
  // {
  //   character: {name: "Gandalg", type: "female-archer"}
  //   direction: 2
  //   position: {x: 175, y: 433}
  //   step: 1
  //   userID: "9182493a-1b54"
  //   userName: "Kátia"
  //}
  const showPlayers = () => {
    const list = [];
    Object.keys(players).forEach((key) => {
      var player = players[key];
      const character = characters[player.character.type];
      list.push(
        <div key={key} className="player-box">
          <Actor
            image={character.avatar}
            data={CONSTANTS.SPRITE_DIMENSIONS}
            step="1"
            direction="0"
            position={{ x: '70px', y: '15px' }}
          />
          <br /><br /><br />
          <span><b>User:</b> {player.userName}</span><br />
          <span><b>Character:</b> {player.character.name}</span><br />
          <Button type="default" size="large" onClick={() => { }}>
            Disconnect
          </Button>
        </div>
      );
    });

    return list;
  }

  return (
    <div className="admin">
      <Header />
      <h1>Admin</h1>
      <h2>
        <span className={connected ? 'green-semaphore semaphore' : 'red-semaphore semaphore'}>
        </span>
        Connected
      </h2>

      {showPlayers()}
    </div>
  )
};

export default Admin;
