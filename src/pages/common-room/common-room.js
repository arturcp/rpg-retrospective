import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import PlayerList from './components/PlayerList';
import loadingImage from '../../images/loading.gif';
import { receiveMessage } from './receive-message';
import { handleModalStage } from './modal-stage';
import { getParameterByName } from './get-parameter-by-name';
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
    showModal: true,
    loading: true,
    modalStage: 'initial',
    players: {},
    userID: null,
  }

  themeRef = React.createRef();
  themeOption1Ref = React.createRef();
  themeOption2Ref = React.createRef();
  themeOption3Ref = React.createRef();
  themeOption4Ref = React.createRef();

  client = new W3CWebSocket('ws://127.0.0.1:8000');

  componentDidMount() {
    // const { data } = this.props;
    // const { character } = data;

    const param = getParameterByName('type');
    const name = getParameterByName('name');
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

      this.setState(
        receiveMessage(dataFromServer, {
          character: character,
          characterType: data.type,
          players: this.state.players,
          sendMessage: this.sendMessage,
        })
      );
    };
  }

  sendMessage = (type, value) => {
    this.client.send(JSON.stringify({ type: type, value: value }));
  }

  onNextHandler = () => {
    const { showModal, modalStage } = this.state;

    if (showModal) {
      this.setState(
        handleModalStage(modalStage, {
          themeRef: this.themeRef,
          themeOption1Ref: this.themeOption1Ref,
          themeOption2Ref: this.themeOption2Ref,
          themeOption3Ref: this.themeOption3Ref,
          themeOption4Ref: this.themeOption4Ref,
        })
      );
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
        list.push(
          <PlayerList
            player={player}
            userID={this.state.userID}
            sendMessage={this.sendMessage}
          />
        );
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
              <img className="loading" src={loadingImage} alt="loading"/>
            )}

            {!loading && (
              <>
                {modalStage === 'initial' && (
                  <p>Welcome, {character.name}, to your fate. Your party is eager to know you before you depart to your mission together.</p>
                )}

                {modalStage === 'chooseTheme' && (
                  <>
                    <p>First, choose a theme you care about. For example, it can be animals, TV series, movies, and so on.</p>
                    <Input type="text" className="theme" placeholder="Theme" ref={this.themeRef} />
                  </>
                )}

                {modalStage === 'listItens' && (
                  <>
                    <p>Now, list four of itens of this theme. The other will have to guess which one of these four is your favorite.</p>

                    <Input type="text" className="theme-item" placeholder="Theme" ref={this.themeOption1Ref} />
                    <Input type="text" className="theme-item" placeholder="Theme" ref={this.themeOption2Ref} />
                    <Input type="text" className="theme-item" placeholder="Theme" ref={this.themeOption3Ref} />
                    <Input type="text" className="theme-item" placeholder="Theme" ref={this.themeOption4Ref} />
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
