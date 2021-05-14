import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Card, Avatar, Input, Typography } from 'antd';

import 'antd/dist/antd.css';
import './style.css';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class Chat extends Component {
  state = {
    userName: '',
    messages: [],
    isLoggedIn: false,
    searchVal: '',
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('Websocket client connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Get a reply: ', dataFromServer);

      if (dataFromServer.type === 'message') {
        this.saveReceivedMessage(dataFromServer);
      }
    };
  }

  saveReceivedMessage = (data) => {
    const newMessage = {
      text: data.value,
      user: data.user
    }
    const newMessagesList = [...this.state.messages, newMessage];
    this.setState({ messages: newMessagesList });
  }

  onButtonClick = (value) => {
    console.log('enviando...')
    client.send(JSON.stringify({
      type: 'message',
      value: value,
      user: this.state.userName
    }))
    this.setState({ searchVal: '' });
  }

  onSearch = (value) => {
    this.setState({ isLoggedIn: true, userName: value });
  }

  render() {
    const { isLoggedIn, messages, userName } = this.state
    return (
      <section className="main">
        <div className="title">
          <Text>Partners Admission - RPG Retrospective</Text>
        </div>

        {isLoggedIn && (
          <>
            <div className="messages-list">
              {messages.map((message, index) =>
                <Card key={index} className={ userName === message.user ? 'card right-card' : 'card left-card' }>
                  <Meta
                    avatar={
                      <Avatar>{message.user[0].toUpperCase()}</Avatar>
                    }
                    title={message.user}
                    description={message.text}
                  >
                  </Meta>
                </Card>
              )}
            </div>

            <div className="bottom">
              <Search
                placeholder="Type your message"
                enterButton="Send"
                size="large"
                value={this.state.searchVal}
                onChange={e => this.setState({ searchVal: e.target.value })}
                onSearch={value => this.onButtonClick(value)}
              />
            </div>
          </>
        )}

        {!isLoggedIn && (
          <div className="login-container">
            <h2>What is your name?</h2>
            <Search
              placeholder="Enter your name"
              enterButton="Login"
              size="large"
              onSearch={this.onSearch}
            />
          </div>
        )}
      </section>
    )
  }
}
