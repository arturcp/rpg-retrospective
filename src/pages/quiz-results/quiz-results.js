import React from 'react';
import { Table } from 'antd';
import Header from '../../components/Header/Header';

import './styles.scss';


const columns = [
  {
    title: 'Name',
    dataIndex: 'playerName',
    key: 'playerName',
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'points',
  },
];

const quizResults = (props) => {
  const data = props.location.state.quizResults;
  const players = props.location.state.quizResultPlayers;

  const showPlayersOptions = () => {
    const list = [];
    Object.keys(players).forEach((characterName) => {
      const quiz = players[characterName].quiz;
      list.push(
        <div className="player-card" key={characterName}>
          <h2>
            {players[characterName].userName}
          </h2>

          <h4>Theme: {quiz.theme}</h4>

          <section>
            <div>
              <input type="radio" name={`${players[characterName].userName}-quiz-option`} value={quiz.option1} checked={quiz.option1 === quiz.answer} />
              <label htmlFor="quiz-option1">{quiz.option1}</label>
            </div>
            <div>
              <input type="radio" name={`${players[characterName].userName}-quiz-option`} value={quiz.option2} checked={quiz.option2 === quiz.answer} />
              <label htmlFor="quiz-option2">{quiz.option2}</label>
            </div>
            <div>
              <input type="radio" name={`${players[characterName].userName}-quiz-option`} value={quiz.option3} checked={quiz.option3 === quiz.answer} />
              <label htmlFor="quiz-option3">{quiz.option3}</label>
            </div>
            <div>
              <input type="radio" name={`${players[characterName].userName}-quiz-option`} value={quiz.option4} checked={quiz.option4 === quiz.answer} />
              <label htmlFor="quiz-option4">{quiz.option4}</label>
            </div>
        </section>
        </div>
      )
    });

    return list;
  }

  return (
    <>
      <Header />
      <div className="quiz-results-container">
        <h1>Ranking</h1>
        <Table columns={columns} dataSource={data} />
        <br />
        <h1>All answers</h1>
        <br />
        {showPlayersOptions()}
        <br />

        <div className="call-to-action">
          <a href="#/" target="_blank">Take me to the retrospective</a>
        </div>
      </div>
    </>
  )
};

export default quizResults;
