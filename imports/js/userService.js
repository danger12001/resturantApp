import history from './history.js';
import {
    Session
} from 'meteor/session'
const XLSX = require('xlsx');

export function getUsers() {

    return Users.find({}).fetch()

}

export function login(email, password) {
    if (this.getUsers().find(o => o.email === email && o.password === password) !== undefined) {
        Session.setPersistent("currentUser", this.getUsers().find(o => o.email === email && o.password === password));
        history.push('/')
    } else {
        alert('wrong credentials!');
    }
}


export function getCurrentUser() {
    if (Session.get('currentUser') !== undefined) {
        return Session.get('currentUser');
    } else {

        return undefined;
    }
}

export function logout() {
    Session.setPersistent("currentUser", undefined);
    history.push('/login')
}

export function getUser(id) {
    var user = this.getUsers().find(o => o._id._str === id._str)
    if (user !== undefined) {

        if (user._id._str === id._str) {
            return user
        } else {
            console.log('user id does not match');
        }

    } else {
        return 'user does not exist'
    }
}

export function checkAuth() {
    if (this.getCurrentUser() === undefined) {

        return false;
    } else {
        return true
    }

}

export function setPassword(id, password) {

    Meteor.call('setPassword', {
        id: id,
        password: password
    }, (err, res) => {
        if (err) {
        } else {
            this.login(this.getUser(id).email, password)
        }
    });


}
