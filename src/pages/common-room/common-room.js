import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import loadingImage from '../../images/loading.gif';
import Player from '../../components/Sprites/Player';
import CONSTANTS from '../../domain/constants';
import { characters } from '../../domain/characters';
import { Input } from 'antd';

import './styles.scss';


/*
  Players example:

  [{
    userID: 123123123123,
    position: { x: 175, y: 433 },
    direction: 2,
    step: 1,
    character: {
      name: 'Gandalf',
      type: 'male-wizard'
    }
  }]
*/
class CommonRoom extends Component {
  state = {
    connected: false,
    showModal: false,
    loading: true,
    modalStage: 'initial',
    players: {},
    userID: null,
  }

  client = new W3CWebSocket('ws://127.0.0.1:8000');

  getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  componentDidMount() {
    // const { data } = this.props;
    // const { character } = data;
    // debugger;

    const param = this.getParameterByName('type');
    const name = this.getParameterByName('name');
    const character = { ...characters[param], name: name };
    const data = { type: param, character: character };

    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);

    this.client.onopen = () => {
      this.setState({ connected: true })
    };

    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      // console.log('Message arrived: ', dataFromServer.type);
      // console.log('Message body: ', dataFromServer.message)

      if (dataFromServer.type === 'client-connected') {
        console.log('Connected!: ', dataFromServer);
        this.setState({ userID: dataFromServer.userID });
        this.sendMessage('game-connection-request', {
          userID: dataFromServer.userID,
          position: { x: 175, y: 433 },
          direction: 2,
          step: 1,
          character: {
            name: character.name,
            type: data.type,
          }
        });
      }

      if (dataFromServer.type === 'new-player') {
        // Redraw all players
        console.log('Updating state\'s players with ', dataFromServer.message);
        this.setState({ players: dataFromServer.message })
      }

      if (dataFromServer.type === 'disconnected') {
        // Show a message and a link to restart
      }

      if (dataFromServer.type === 'reset') {
        // Restart the user but only in this page, not
        // making it start from scratch
      }

      if (dataFromServer.type === 'player-moved' && dataFromServer.message.character.name) {
        // Find the player in the list of players from the
        // current page's state and change its position
        console.log('== player moved ==');
        const currentPlayers = this.clonePlayers();
        // const currentPlayers = {...this.state.players};
        const characterName = dataFromServer.message.character.name;
        currentPlayers[characterName] = dataFromServer.message;

        this.setState({ players: currentPlayers });
      }
    };
  }

  clonePlayers = () => {
    // return JSON.parse(JSON.stringify(this.state.players));
    const players = {}
    Object.keys(this.state.players).forEach((key) => {
      players[key] = {
        ...this.state.players[key],
        position: {
          ...this.state.players[key].position,
        },
        character: {
          ...this.state.players[key].character
        }
      }
    });

    return players;
  }

  sendMessage = (type, value) => {
    this.client.send(JSON.stringify({
      type: type,
      value: value
    }))
  }

  onNextHandler = () => {
    const { showModal, modalStage } = this.state;

    if (showModal) {
      if (modalStage === 'initial') {
        this.setState({ modalStage: 'chooseTheme' });
      } else if (modalStage === 'chooseTheme') {
        this.setState({ modalStage: 'listItens' });
      } else if (modalStage === 'listItens') {
        this.setState({ modalStage: 'instructions' });
      } else if (modalStage === 'instructions') {
        this.setState({ modalStage: '', showModal: false });
      }
    }
  }

  showPlayers = () => {
    if (this.state.showModal) {
      return null;
    } else {
      const list = [];

      console.log('Reading players from state:')
      console.log(this.state.players);

      Object.keys(this.state.players).forEach((key) => {
        var player = this.state.players[key];
        console.log(player.character.name, ' player.position: ', player.position);
        list.push(this.buildPlayer(player));
      })

      return list;
    }
  }

  buildPlayer = (player) => {
    const character = characters[player.character.type];

    console.log(`Drawing ${player.character.name} at ${player.position.x}, ${player.position.y} (${player.direction})`)

    return <Player
      key={player.character.name}
      // key={player.userID}
      image={character.avatar}
      data={CONSTANTS.SPRITE_DIMENSIONS}
      allowInteraction={player.userID === this.state.userID}
      initialData={{
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        direction: player.direction,
        step: player.step,
      }}
      onMove={(position, direction, step) => {
        this.sendMessage('player-moved', {
          userID: player.userID,
          position,
          direction,
          step,
          character: player.character
        })
      }}
    />;
  }

  render() {
    const { showModal, loading, modalStage } = this.state;
    const { data } = this.props;
    const { character } = data;

    console.log('render...');

    return (
      <div className="container">
        {showModal && (
          <Modal
            buttonText="Next"
            showButton={!loading}
            title={loading ? 'Loading...' : 'And the journey begins'}
            onButtonClick={this.onNextHandler}
          >
            {loading && (
              <img src={loadingImage} alt="loading"/>
            )}

            {!loading && (
              <>
                {modalStage === 'initial' && (
                  <p>Welcome, {character.name}, to your fate. Your party is eager to know you before you depart to your mission together.</p>
                )}

                {modalStage === 'chooseTheme' && (
                  <>
                    <p>First, choose a theme you care about. For example, it can be animals, TV series, movies, and so on.</p>
                    <Input type="text" className="theme" placeholder="Theme" />
                  </>
                )}

                {modalStage === 'listItens' && (
                  <>
                    <p>Now, list four of itens of this theme. The other will have to guess which one of these four is your favorite.</p>
                    <Input type="text" className="theme-item" placeholder="Theme" />
                    <Input type="text" className="theme-item" placeholder="Theme" />
                    <Input type="text" className="theme-item" placeholder="Theme" />
                    <Input type="text" className="theme-item" placeholder="Theme" />
                  </>
                )}

                {modalStage === 'instructions' && (
                  <>
                    <p>Feel free to move around. When the adventure begins, you will see a control pane in the corner of the screen.</p>
                    <p>There, you will find a button to claim your turn. On the player's turn, each one will exhibit the theme and show the items. </p>
                    <p>The others will votem, trying to guess what is the favorite item. If you guess right, you score a point. When in doubt, pray for the gods, they will guide your choice.</p>
                  </>
                )}
              </>
            )}
          </Modal>
        )}

        {!showModal && this.showPlayers()}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps, null)(CommonRoom);
