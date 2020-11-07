import React from 'react';
import { Link } from 'react-router-dom';

export const Project_CAP_Manifest = {
  title: 'Colorado Auto & Parts',
  date: 'Nov 2020',
  description: 'I redesigned and modernized the Wordpress website of a renowned local Englewood based automotive salvage yard.',
  tags: ['Web Development', 'Web Design', 'Wordpress', 'Bootstrap'],
  banner: '/static/img/cap.png',
  path: '/projects/coloradoautoandparts'
};

export class Project_CAP extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'><span className='h4 text-secondary'><Link to='/projects'><i className='fas fa-folder-open mr-2'></i>Projects/ </Link></span>Colorado Auto & Parts</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
              
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Old Website</h4>
            <p className='card-text'>
              
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Technical Summary</h4>
            <p className='card-text'>
              Although I considered rebuilding the entire site from the ground up using a more modern framework such as Express, but the more cost effective option was just to make a new Wordpress theme. I expect Wordpress hosting to continue to be cheap for the foreseeable future simply because it is so common.
            </p>
            <ul className='mb-0'>
              <li>I used Bootswatch's Flatly theme as my starting point.</li>
              <li>I recompiled the theme with Colorado Auto & Parts branding colors and a few custom classes for the header.</li>
              <li>The default Wordpress theme was gradually rebuilt using the Bootstrap grid layout and Bootstrap classes.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}