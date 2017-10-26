import React from 'react';
import './Login.css';
import { func } from "prop-types";

const Login = (props) => {
  console.log('pros in login', props);
  
  return (
    <form className="form">
      <input type="submit" value="Login" className="submit" onClick={ props.submit } />
      <input type="text" placeholder="Email" className="input email" />
      <input type="password" placeholder="Password" className="input password" />
    </form>
  );
};

export default Login;

Login.propTypes = {
  submit: func
};