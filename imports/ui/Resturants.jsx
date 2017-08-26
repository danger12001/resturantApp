import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ResturantItem from './resturants/Resturant.jsx';

import history from '../js/history.js';
import accounts from '../js/userService.js';

export default class ResturantList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderResturantList() {
        if (this.props.resturants.length > 0) {
            return this.props.resturants.map((resturant, index) => (<ResturantItem key={index} resturant={resturant}/>))
        } else {
            return (
                <div>There are no resturants.</div>
            )
        }

    }
    goToAdd() {
        history.push('/add');
    }

    render() {
        return (
            <div className='spacer'>

            <div onClick={this.goToAdd.bind(this)} className='btn add-button'>
            Add Resturant
            </div>

                <div>
                    {this.renderResturantList()}
                </div>

            </div>

        );
    }
}
