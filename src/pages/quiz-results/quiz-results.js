import React from 'react';
import { Table, Divider, Tag } from 'antd';
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

  return (
    <>
      <Header />
      <div className="quiz-results-container">
        <h1>Ranking</h1>
        <Table columns={columns} dataSource={data} />

      </div>
    </>
  )
};

export default quizResults;
