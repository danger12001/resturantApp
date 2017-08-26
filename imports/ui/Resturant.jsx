import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import history from '../js/history.js';
import accounts from '../js/userService.js';
import resturantService from '../js/resturantService.js';
import Review from './resturants/Review.jsx'
import ReactDOM from 'react-dom';

export default class ResturantDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            review: '',
            resturantRating: props.resturant.rating
        }
    }
    updateState(rating) {
        this.setState({rating: rating})

    }

    addReview() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;

        const review = ReactDOM.findDOMNode(this.refs.review).value.trim();
        var data = {
            review: review,
            rating: this.state.rating,
            date: today,
            reviewer: accounts.getCurrentUser().name
        }

        if (this.state.rating > 0) {
            Meteor.call('Resturant.addReview', {
                id: this.props.resturant._id,
                data: data
            }, (err, res) => {
                if (err) {} else {
                    // success!
                    this.updateRatings();
                }
            });
            this.setState({rating: 0, review: ''});
            this.refs.review.value = "";
        }
    }

    updateRatings() {
        var reviews = resturantService.getResturant(this.props.resturant._id).reviews;

        var total = reviews.length;
        var sum = 0;

        reviews.forEach(function(review) {
            sum += review.rating;
        })

        var averageRating = sum / total;
        //update resturant rating
        Meteor.call('Resturant.updateRating', {
            id: this.props.resturant._id,
            rating: parseInt(averageRating)
        }, (err, res) => {
            if (err) {
                //   console.log(err);
            } else {}
        });

    }

    renderReviews() {
        if (this.props.resturant.reviews.length > 0) {
            return this.props.resturant.reviews.map((review, i) => (<Review key={i} review={review}/>))
        } else {
            return <div>There are no reviews!</div>
        }
    }

    renderStars(rating, display) {
        var stars = [
            {
                star: 1,
                css: 'inactive-star'
            }, {
                star: 2,
                css: 'inactive-star'
            }, {
                star: 3,
                css: 'inactive-star'
            }, {
                star: 4,
                css: 'inactive-star'
            }, {
                star: 5,
                css: 'inactive-star'
            }
        ]
        stars.forEach(function(star) {
            if (star.star <= rating) {
                star.css = 'active-star';
            } else {
                star.css = 'inactive-star';
            }
        })
        if (display) {
            return stars.map((star, i) => (
                <div className={star.css} key={i}></div>
            ))

        } else {
            return stars.map((star, i) => (
                <div className={star.css} key={i} onClick={this.updateState.bind(this, star.star)}></div>
            ))
        }

    }

    render() {
        let buttonCss = 'inactive-button btn'
        if (this.state.rating > 0) {
            buttonCss = 'btn app-blue'
        }

        return (
            <div className='spacer'>

                <div className="resturant-container app-blue row">
                    <div className='col s12'>
                        <div className='image-container'>
                            <img className='picture' src={this.props.resturant.image}/>
                        </div>
                    </div>
                    <div className='col s12 resturant-name white-text'>
                        {this.props.resturant.name}
                        <br/>
                        <div className=' resturant-address'>
                            {this.props.resturant.address}
                        </div>
                    </div>
                    <div className='col s12 right-aligned'>
                        {this.renderStars(this.props.resturant.rating, true)}
                    </div>

                </div>

                <div >
                    {this.renderStars(this.state.rating, false)}
                </div>

                <input type="text" ref="review" maxLength='300' placeholder="Review (Optional)"/>

                <div onClick={this.addReview.bind(this)} className={buttonCss}>Add Review</div>

                <div>
                    <div className='title'>
                        Reviews
                    </div>

                    <div>
                        {this.renderReviews()}

                    </div>

                </div>

            </div>

        );
    }
}
