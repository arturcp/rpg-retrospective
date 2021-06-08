import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actionTypes from '../../store/actions';

import Modal from '../../components/UI/Modal/Modal';
import Quiz from './components/Quiz';
import PlayerList from './components/PlayerList';
import loadingImage from '../../images/loading.gif';
import { receiveMessage } from './receive-message';
import { handleModalStage } from './modal-stage';
import { Input, Select } from 'antd';

import './styles.scss';

/*
  Players example:

  [{
    userID: 123123123123,
    userName: 'Carlos',
    position: { x: 175, y: 433 },
    direction: 2,
    step: 1,
    character: {
      userName: 'Carlos',
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
    showQuiz: false,
    quiz: {
      answers: [],
      currentParticipantIndex: 0,
      completed: false,
      answerSend: false,
      participants: [],
    },


    // [
    //   {playerName: "Phoebe 1622899116591", points: 1},
    //   {playerName: "Artur 1622899115505", points: 0}
    //]
    quizResults: [],

    // This variable will hold the list of players from the
    // server, containing all quiz options and answers.
    //
    // It will be used to show each player's choices and correct
    // answer at the end.
    quizResultPlayers: [],
  }

  themeRef = React.createRef();
  themeOption1Ref = React.createRef();
  themeOption2Ref = React.createRef();
  themeOption3Ref = React.createRef();
  themeOption4Ref = React.createRef();


  client = new W3CWebSocket(process.env.REACT_APP_SERVER_URL);

  componentDidMount() {
    const { quiz, connected } = this.state;
    const { data, userName } = this.props;
    const { character } = data;

    if (connected) {
      console.log(`Connected to ${process.env.REACT_APP_SERVER_URL}`);
    }

    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);

    this.client.onopen = () => {
      this.setState({ connected: true })
    };

    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const { userID } = this.state;

      const newState = receiveMessage(dataFromServer, {
        userName,
        character,
        characterType: data.type,
        players: this.state.players,
        sendMessage: this.sendMessage,
        quiz,
        userID,
      });

      this.setState(newState);
    };
  }

  sendMessage = (type, value) => {
    this.client.send(JSON.stringify({ type: type, value: value }));
  }

  onNextHandler = () => {
    const {
      showModal,
      modalStage,
      theme,
      themeOption1,
      themeOption2,
      themeOption3,
      themeOption4,
      quizAnswer,
    } = this.state;

    const { userName, data } = this.props;
    const { character } = data;


    if (showModal) {
      const newState = handleModalStage(modalStage, {
        themeRef: this.themeRef,
        themeOption1Ref: this.themeOption1Ref,
        themeOption2Ref: this.themeOption2Ref,
        themeOption3Ref: this.themeOption3Ref,
        themeOption4Ref: this.themeOption4Ref,
      });

      if (newState && newState.modalStage === 'finished') {
        this.sendMessage('quiz-ready', {
          userName,
          characterName: character.name,
          theme,
          option1: themeOption1,
          option2: themeOption2,
          option3: themeOption3,
          option4: themeOption4,
          quizAnswer,
        });
      }

      this.setState(newState);
    }
  }

  showPlayers = () => {
    if (this.state.showModal) {
      return null;
    } else {
      const list = [];
      let index = 0;

      Object.keys(this.state.players).forEach((key) => {
        let player = this.state.players[key];
        index += 1;
        if (player) {
          list.push(
            <PlayerList
              key={`player-list-${index}`}
              player={player}
              userID={this.state.userID}
              sendMessage={this.sendMessage}
            />
          );
        }
      })

      return list;
    }
  }

  onNextQuizHandler = (lastQuestion) => {
    const { quiz } = this.state;

    const clearOptions = () => {
      const options = document.querySelectorAll('[data-quiz-option]');
      for (let index = 0; index < options.length; index++) {
        options[index].checked = false;
      }
    }

    const answer = document.querySelector('[data-quiz-option]:checked');
    if (answer) {
      if (quiz.currentParticipantIndex < quiz.participants.length) {
        this.setState(prev => {
          const previousIndex = prev.quiz.currentParticipantIndex;
          clearOptions();

          const newState = {
            showQuiz: !lastQuestion,
            quiz: {
              ...this.state.quiz,
              currentParticipantIndex: previousIndex + 1,
              answers: [...prev.quiz.answers, {
                answer: answer.value,
                characterName: quiz.participants[previousIndex].characterName,
              }],
              completed: lastQuestion,
            }
          }

          return newState;
        })
      }
    }
  };

  render() {
    const {
      showModal,
      connected,
      loading,
      modalStage,
      showQuiz,
      quiz,
      theme,
      themeOption1,
      themeOption2,
      themeOption3,
      themeOption4,
      quizResults,
      quizResultPlayers,
    } = this.state;
    const { data, iceBreaker, userName } = this.props;
    const { character } = data;
    const { Option } = Select;

    if (quiz.completed && !quiz.answerSend) {
      this.setState({
        quiz: {
          ...this.state.quiz,
          answerSend: true,
        }
      })
      this.sendMessage('quiz-completed', { userName, answers: quiz.answers })
    }

    const onQuizAnswerChangeHandler = (value) => {
      this.setState({
        quizAnswer: value,
      });
    }

    return (
      <div className="container">
        {quizResults.length > 0 && (
          <Redirect to={{
              pathname: "quiz-results",
              state: { quizResults, quizResultPlayers }
            }}
          />
        )}

        {showModal && iceBreaker && !iceBreaker.option4 && (
          <Modal
            buttonText="Next"
            showButton={!loading}
            title={loading ? 'Loading...' : 'And the journey begins'}
            onButtonClick={this.onNextHandler}
          >
            {(loading || !connected) && (
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

                {modalStage === 'answer' && (
                  <>
                    <p>Which {theme} is your favorite?</p>
                    <Select defaultValue={themeOption1} style={{ width: 120 }} onChange={onQuizAnswerChangeHandler}>
                      <Option value={themeOption1}>{themeOption1}</Option>
                      <Option value={themeOption2}>{themeOption2}</Option>
                      <Option value={themeOption3}>{themeOption3}</Option>
                      <Option value={themeOption4}>{themeOption4}</Option>
                    </Select>
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

        {showQuiz && (
          <Modal
            showButton
            buttonText={ quiz.currentParticipantIndex === quiz.participants.length - 1 ? 'Send' : 'Next' }
            title={'Quiz'}
            onButtonClick={() => this.onNextQuizHandler(quiz.currentParticipantIndex === quiz.participants.length - 1)}
          >
            <Quiz quiz={quiz.participants[quiz.currentParticipantIndex]} />
          </Modal>
        )}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    userName: state.userName,
    data: state.data,
    iceBreaker: state.iceBraker,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIceBreakerInformationSaved: (theme, option1, option2, option3, option4) => dispatch({
      type: actionTypes.SAVE_ICE_BREAKER_INFORMATION,
      theme: theme,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonRoom);
