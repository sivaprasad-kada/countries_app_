import React, { Component } from 'react';
import './CountryListShimmer.css';

export default class CountryListShimmer extends Component {
  render() {
    return (
      <div className="countries-container">
      {
        Array.from({length : 100}).map((el,i)=>{
          return (
            <div className="shimmer" key={i}>
            <div className="country-name"></div>
            <div className='population'></div>
            <div className='region'></div>
            <div className='capital'></div>
            </div>
          )
        })
      }
      </div>
    );
  }
}
