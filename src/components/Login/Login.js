import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

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
      onSearch={name => {
        props.onUserNameSaved(name);
        props.onClick();
      }}
    />
  </div>
)

const mapStateToProps = state => {
  return {
    userName: state.userName
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUserNameSaved: (name) => dispatch({ type: actionTypes.SAVE_USER_NAME, name: name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
