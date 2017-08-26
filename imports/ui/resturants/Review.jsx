import React, { Component } from 'react';
import history from '../../js/history.js';

export default class Review extends Component {


  renderStars(){
  var stars = [{star: 1, css: 'inactive-star'},{star: 2, css: 'inactive-star'},{star: 3, css: 'inactive-star'},{star: 4, css: 'inactive-star'},{star: 5, css: 'inactive-star'}]
  var rating = this.props.review.rating;
  stars.forEach(function(star){
    if(star.star <= rating){
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
      <div className='review-container row app-blue' >
      <div className='col s12'>
      <div className="date white-text">{this.props.review.date}</div>
      </div>
      <div className='col s12'>
      <div className="reviewer white-text">{this.props.review.reviewer}</div>
      </div>
      <div className='col s12'>
      <div className="review white-text">

      {this.renderStars()}
      <br/>
      {this.props.review.review}

      </div>
      </div>

      </div>
   );

 }
}
