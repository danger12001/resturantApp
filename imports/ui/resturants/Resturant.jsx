import React, {Component} from 'react';
import history from '../../js/history.js';

export default class ResturantItem extends Component {

    redirectToResturant() {
        var url = '/resturant/' + this.props.resturant._id;
        history.push(url);
    }

    renderStars(rating) {
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

        return stars.map((star, i) => (
            <div className={star.css} key={i}></div>
        ))

    }

    render() {

        return (

            <div onClick={this.redirectToResturant.bind(this)} className='resturant-container app-blue row hover'>
            <div className='col s12'>
            <div className='image-container'>
            <img className="picture" src={this.props.resturant.image}/>
            </div>
            </div>
            <div className='col s12 resturant-name white-text'>
{this.props.resturant.name}
            </div>
            <div className='col s12 right-aligned'>
            {this.renderStars(this.props.resturant.rating)}
            </div>
            </div>
        );

    }
}
