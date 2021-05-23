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

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class CommonRoom extends Component {
  state = {
    connected: false,
    showModal: true,
    loading: true,
    modalStage: 'initial',
    players: {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);

    client.onopen = () => {
      this.setState({ connected: true })
      console.log('Websocket client connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Got a reply: ', dataFromServer);

      if (dataFromServer.type === 'client-connected') {
        console.log('Connected!: ', dataFromServer);
        this.sendMessage('game-connection-request', {
          userID: 1,
          position: { x: 175, y: 433 },
          direction: 2,
          step: 1,
          character: {
            name: 'Nome do personagem',
            type: 'female-archer'
          }
        });
      }

      if (dataFromServer.type === 'new-player') {
        // Redraw all players
        console.log(dataFromServer);
        this.setState({ players: dataFromServer.message })
      }


      if (dataFromServer.type === 'disconnected') {
        // Show a message and a link to restart
      }

      if (dataFromServer.type === 'reset') {
        // REstart the user but only in this page, not
        // making it start from scratch
      }

      if (dataFromServer.type === 'playerMoved') {
        // Find the player in the list of players from the
        // current page's state and change its position
      }


      // if (dataFromServer.type === 'message') {
      //   this.saveReceivedMessage(dataFromServer);
      // }
    };
  }

  sendMessage = (type, value) => {
    console.log('Sending message ', type, ' with value ', value);
    client.send(JSON.stringify({
      type: type,
      value: value
    }))
  }

  onNextHandler = () => {
    const { showModal, modalStage } = this.state;
    // const { character } = this.props;
    // const character = characters['female-archer'];

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
      const self = this;

      Object.keys(this.state.players).forEach(function (key) {
        var value = self.state.players[key];
        const character = characters[value.character.type];
        list.push(<Player
          key={value.character.name}
          image={character.avatar}
          data={CONSTANTS.SPRITE_DIMENSIONS}
          allowInteraction={true}
          initialData={{
            position: value.position,
            direction: value.direction,
            step: value.step,
          }}
          // movementsRestrictions={{
          //   directions: ['left', 'right', 'up', 'down'],
          //   minY: 33,
          //   maxY: 68,
          //   maxX: 374,
          //   minX: 0,
          // }}
        />);
      })

      return list;
    }
  }

  render() {
    const { showModal, loading, modalStage } = this.state;
    const { data } = this.props;
    const { character } = data;

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

        {this.showPlayers()}
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
