import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import history from '../js/history.js';
import accounts from '../js/userService.js';
import ReactDOM from 'react-dom';
const XLSX = require('xlsx');

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    uploadFile() {

        const file = ReactDOM.findDOMNode(this.refs.file).files[0];
        var reader = new FileReader();
        var name = file.name;

        reader.onload = function(e) {
            console.log(e.target.result);
            Meteor.call('uploadUsers', e.target.result, function(error, result) {
                if (error)
                    throw error;
                }
            );
        }

        reader.readAsText(file);
    }

    render() {
        return (
            <div>
                <div className="container">
                  <div className='title'>
                  Import Users
                  </div>
                  <div className="file-field input-field">
                        <div className="btn app-blue">
                          <span>Users File</span>
                          <input onChange={this.uploadFile.bind(this)} ref='file' type="file"/>
                        </div>
                        <div className="file-path-wrapper">
                          <input className="file-path validate" type="text"/>
                        </div>
                      </div>

                </div>

            </div>
        );
    }
}
