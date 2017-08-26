import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import history from '../js/history.js';
import accounts from '../js/userService.js';
import {Mongo} from 'meteor/mongo';

export default class SetPassword extends Component {

    setPassword() {
        const id = new Mongo.ObjectID(this.props.location.pathname.split('/')[2]);
        const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

        var currentUser = accounts.getUser(id);
        console.log(currentUser);
        if (currentUser !== undefined) {
            accounts.setPassword(id, password);

        }

    }
    componentDidMount() {}
    render() {
        return (

            <div className="container">


                    <div className="title">Set new password</div>
                    <div >Please enter a new password for your account.</div>

                    <input name="password" ref='password' type="password" placeholder="Password"/>

                    <div onClick={this.setPassword.bind(this)} className="btn">Set Password</div>


            </div>

        );

    }
}
