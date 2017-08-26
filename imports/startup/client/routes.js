import React from 'react';
import { Router, Route, IndexRoute, Switch } from 'react-router';
import { Meteor } from 'meteor/meteor'
import App from '../../ui/App.jsx';
import Login from '../../ui/Login.jsx';
import SetPassword from '../../ui/SetPassword.jsx';
import Admin from '../../ui/Admin.jsx';
import history from '../../js/history.js';
import accounts from '../../js/userService.js';


function checkAuth(path){
  console.log(accounts.checkAuth(), path);
  if(path == '/' && !accounts.checkAuth() || path.split('/')[1] == 'resturant' && !accounts.checkAuth() || path == '/add' && !accounts.checkAuth()){
    history.push('/login')
  } else {
    return true;
  }
}

export const renderRoutes = () => (
  <Router history={history}>

  <Switch>
  <Route exact path='/admin'  component={Admin}  />
  <Route exact  path='/setPassword/:userId'   component={SetPassword} />
  <Route exact  path='/login' component={Login} />


  <Route exact path='/' component={App}  onEnter={checkAuth(this.location.pathname)}/>
  <Route  exact  path='/add' component={App}  />
  <Route  exact  path='/resturant/:id?' component={App}  />
  </Switch>

  </Router>
);
