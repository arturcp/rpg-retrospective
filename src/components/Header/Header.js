import React from 'react';

import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import logo from '../../images/logo.png';

import './styles.scss';

const { Text } = Typography;
const header = () => (
  <header className="header">
    <Link to="/">
      <div className="logo">
        <img src={logo} alt="logo"/>
        <Text>Role Playing Game - Retro</Text>
      </div>
    </Link>
  </header>
);

export default header;
