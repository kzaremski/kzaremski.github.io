import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Education from './routes/education';
import Experience from './routes/experience';
import Home from './routes/home';
import Skills from './routes/skills';

export default class MainRouter extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <div className='row'>
            <div className='col-md-5 col-lg-4'>
              <div className='card bg-primary shadow-soft border-light mt-6'>
                <div className='profile-image bg-primary shadow-inset border border-light rounded p-3 ml-3 mt-n5'>
                  <img src='/static/pfp.jpg' className='card-img-top rounded' alt='Konstantin Profile Picture'/>
                </div>
                <div className='card-body'>
                  <h3 className='h5 mb-1 font-weight-bold'>Konstantin Zaremski</h3>
                  <span className='h6 font-weight-normal text-gray'>Computer Science Student</span>
                  <p className='card-text text-secondary mt-2'><i className='fas fa-map-marker mr-1'></i> Denver, Colorado</p>
                  <div className='list-group shadow-inset rounded'>
                    <NavLink className='list-group-item py-2' activeClassName='bg-secondary text-white' to='' exact><i className='fas fa-address-card mr-2'></i>Introduction</NavLink>
                    <NavLink className='list-group-item py-2' activeClassName='bg-secondary text-white' to='education'><i className='fas fa-graduation-cap mr-2'></i>Education</NavLink>
                    <NavLink className='list-group-item py-2' activeClassName='bg-secondary text-white' to='skills'><i className='fas fa-pencil-ruler mr-2'></i>Skills</NavLink>
                    <NavLink className='list-group-item py-2' activeClassName='bg-secondary text-white' to='personalproject'><i className='fas fa-project-diagram mr-2'></i>Personal Project</NavLink>
                    <NavLink className='list-group-item py-2' activeClassName='bg-secondary text-white' to='experience'><i className='fas fa-briefcase mr-2'></i>Experience</NavLink>
                    <NavLink className='list-group-item py-2' activeClassName='bg-secondary text-white' to='contact'><i className='fas fa-phone mr-2'></i>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-7 col-lg-8 pt-5'>
              <Route path='/' exact component={ Home }/>
              <Route path='/education' component={ Education }/>
              <Route path='/skills' component={ Skills }/>

              <Route path='/experience' component={ Experience }/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}