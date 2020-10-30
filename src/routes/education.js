import React from 'react';

export default class Education extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'>Education</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>A.S. in Computer Science</h4>
            <p className='card-text'>
              <i className='fas fa-school mr-2'></i>Arapahoe Community College<i className='fas fa-calendar mr-2 ml-3'></i>2019 - 2022 <small>(Expected)</small><br/>
              Part time schedule with intention to transfer to Metropolitain State University to complete the degree as a Bachelor of Science in Computer Science.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
              <i className='fas fa-school mr-2'></i>ThunderRidge High School<i className='fas fa-calendar mr-2 ml-3'></i>2014 - 2016<br/>
              Attended college level classes in high school until diagnosed with cancer in 2016.<br/>
              Finished instead with a G.E.D. in February of 2018.
            </p>
          </div>
        </div>
      </div>
    );
  }
}