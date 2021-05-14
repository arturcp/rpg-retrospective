import React from 'react';
import { Input } from 'antd';

import 'antd/dist/antd.css';
import './styles.scss';

const { Search } = Input;

const Login = (props) => (
  <div className="login-container scale-in-center">
    <h2>What is your name?</h2>
    <Search
      placeholder="Enter your name"
      enterButton="Login"
      size="large"
      onSearch={props.onClick}
    />
  </div>
)

export default Login;
