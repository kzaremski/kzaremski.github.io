import React from 'react';
import { Link } from 'react-router-dom';

export default class Awards extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'>Awards</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>MSU Denver - DU Joint Hackathon 2023</h4>
            <p className='card-text'>
              <i className='fas fa-award mr-2'></i>First Place<i className='fas fa-calendar mr-2 ml-3'></i>October 2023<br/>
            </p>
            <ul className='card-text'>
              <li>Over 30 hours, I and a team of 4 other people built a multi-university event aggregator website with Node.js and MongoDB.</li>
              <li>Judges noted that the amount of progress that we made in the brief span of the event was remarkable.</li>
            </ul>
            <Link className='card-text text-secondary' to='/projects/hack23'>Read more about our project on it's respective project page.</Link>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Arapahoe Community College Coding Competition</h4>
            <p className='card-text'>
              <i className='fas fa-award mr-2'></i>First Place<i className='fas fa-calendar mr-2 ml-3'></i>November 2022<br/>
            </p>
            <ul className='card-text'>
              <li>Individual competitive programming in Java.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}