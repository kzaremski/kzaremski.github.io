import React from 'react';

export default class Education extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'>Education</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Bachelor of Science in Computer Science</h4>
            <p className='card-text'>
              <i className='fas fa-school mr-2'></i>Metropolitan State University of Denver<i className='fas fa-calendar mr-2 ml-3'></i>2025 <small>(Expected)</small><br/>
            </p>
            <ul className='card-text'>
              <li>Cumulative GPA: 3.89/4.0 (in progress)</li>
              <li>Upper Division Coursework & Electives: Machine Learning, Cloud Computing, Networking and Distributed Computing, Algorithms and Algorithm Analysis</li>
            </ul>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Computer Science Transfer Degree</h4>
            <p className='card-text'>
              <i className='fas fa-school mr-2'></i>Arapahoe Community College<i className='fas fa-calendar mr-2 ml-3'></i>2023<br/>
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>High School</h4>
            <p className='card-text'>
              <i className='fas fa-school mr-2'></i>ThunderRidge High School<i className='fas fa-calendar mr-2 ml-3'></i>2018<br/>
            </p>
            <ul className='card-text'>
              <li>Attended AP-level classes in high school until diagnosed with cancer in 2016.</li>
              <li>Finished instead with a GED in February of 2018.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}