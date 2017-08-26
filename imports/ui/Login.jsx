import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import history from '../js/history.js';
import accounts from '../js/userService.js';


export default class Login extends Component {

login(){
  var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
  var password =  ReactDOM.findDOMNode(this.refs.password).value.trim();
  console.log(email, password);
accounts.login(email,password);
}

  render() {
    console.log(accounts.getUsers());
    return (

      	<div className="container">


      			<div className="title">Log In</div>

      			<input name="email" ref='email' type="email" placeholder="Email" />
      			<input name="password" ref='password' type="password" placeholder="Password" />

      			<div onClick={this.login.bind(this)} className="btn app-blue">Log In</div>


        </div>

   );

 }
}
