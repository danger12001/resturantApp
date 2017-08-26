import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import history from '../js/history.js';
// import accounts from '../js/userService.js';

export default class AddResturant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            resturant: {}
        }
    }

    updateState() {
        const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        const address = ReactDOM.findDOMNode(this.refs.address).value.trim();
        console.log(this.state);
        if (this.state.image !== undefined) {

            this.setState({name: name, address: address})
        } else {
            this.setState({name: name, address: address})

        }
        console.log(this.state);

    }

    saveResturant() {
        const id = Mongo.ObjectID();
        if (this.state.name !== undefined && this.state.address !== undefined && this.state.image !== undefined) {
            var data = {
                _id: id,
                reviews: [],
                name: this.state.name,
                address: this.state.address,
                image: this.state.image,
                rating: 0
            }
            Meteor.call('Resturant.add', {
                data: data
            }, (err, res) => {
                if (err) {
                    //   console.log(err);
                } else {
                    history.push('/resturant/' + res);
                }
            });
        } else {
            if (this.state.image === undefined) {
                console.log('please add an image');
            } else if (this.state.name === undefined) {
                console.log('please add a name');
                //
            } else if (this.state.address === undefined) {
                console.log('please add a name');
                //
            }
        }

    }

    uploadImage() {
        const image = ReactDOM.findDOMNode(this.refs.image).files;

        this.setState({loading: true});

        Cloudinary.upload(image, {}, (error, result) => {
            if (error) {
                // handleError();
            }

            this.setState({loading: false, image: result.url});
        });

    }

    componentDidMount() {}

    showLoading() {
        if (this.state.loading) {
            return this.renderLoading()
        } else {
            return <div></div>
        }
    }

    renderLoading() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>

        )
    }

    renderAdd() {
      let buttonCss = 'inactive-button btn';
if(this.state.image === undefined || this.state.name === undefined || this.state.address === undefined){
  buttonCss = 'inactive-button btn app-blue';

} else {

  buttonCss = 'btn app-blue';
}


        return (

            <div className="container">

                <div className="file-field input-field">
                    <div className="btn app-blue">
                        <span>Resturant Image</span>
                        <input onChange={this.uploadImage.bind(this)} ref="image" type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>

                {this.showLoading()}
                <input onChange={this.updateState.bind(this)} type="text" ref="name" placeholder="Resturant Name"/>
                <input onChange={this.updateState.bind(this)} type="text" ref="address" placeholder="Resturant Address"/>

                <div>

                    <div onClick={this.saveResturant.bind(this)} className={buttonCss}>Save Resturant</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>

                {this.renderAdd()}
            </div>
        );

    }
}
