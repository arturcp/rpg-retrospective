import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import Modal from '../../components/UI/Modal/Modal';
import loading from '../../images/loading.gif';

import './styles.scss';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class CommonRoom extends Component {
  state = {
    connected: false,
    showModal: true,
  }

  componentDidMount() {
    client.onopen = () => {
      this.setState({ connected: true })
      console.log('Websocket client connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      // console.log('Get a reply: ', dataFromServer);

      // if (dataFromServer.type === 'message') {
      //   this.saveReceivedMessage(dataFromServer);
      // }
    };
  }

  render() {
    const { showModal } = this.state;

    return (
      <div className="container">
        {showModal && (
          <Modal
            buttonText="Next"
            title=""
            onButtonClick={() => { console.log('clicked'); }}
          >
            <img src={loading} alt="loading"/>
          </Modal>
        )}
      </div>
    )
  }
};
