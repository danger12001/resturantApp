import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ResturantList from './Resturants.jsx';
import ResturantDetail from './Resturant.jsx';
import AddResturant from './addResturant.jsx';
import history from '../js/history.js';
import accounts from '../js/userService.js';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderActiveComponent() {
        console.log(history.location.pathname);
        if (history.location.pathname === '/') {
            return this.renderResturants();
        } else if (history.location.pathname.split('/')[1] === 'add') {
            return this.renderAddResturants();
        } else if (history.location.pathname.split('/')[1] === 'resturant') {
            return this.renderResturant(history.location.pathname.split('/')[2]);
        }

    }

    fetchResturant(id) {
        var data;
        this.props.resturants.forEach(function(resturant) {
            if (resturant._id === id) {
                data = resturant
            } else {
                return null;
            }
        })
        return data;

    }

    renderResturant(id) {

        if (this.fetchResturant(id) !== undefined) {
            return (<ResturantDetail resturant={this.fetchResturant(id)}/>)
        }
    }

    renderAddResturants() {
        return (<AddResturant/>);
    }

    renderResturants() {
        return (<ResturantList resturants={this.props.resturants}/>);
    }

    goHome() {
        history.push('/');
    }

    logout() {
        accounts.logout();
    }

    render() {
        return (
            <div>

                <nav className="app-blue">
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li onClick={this.goHome.bind(this)}>
                                <a> Home </a>
                            </li>
                            </ul>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li  onClick={this.logout.bind(this)}>
                                <a>Logout</a>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div className="container">
                    {this.renderActiveComponent()}
                </div>

            </div>

        );
    }
}
export default createContainer(() => {
    return {resturants: Resturants.find({}).fetch()};
}, App);
