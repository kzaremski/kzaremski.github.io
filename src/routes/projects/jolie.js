import React from 'react';
import { Link } from 'react-router-dom';

export const Project_Jolie_Manifest = {
  title: 'Jolie & Co. Animated Logo Cover Page',
  date: 'Sep 2017',
  description: 'I was contracted to animate the logo of a Denver based wedding stationery company and integrate it into their website cover page on Squarespace.',
  tags: ['Animation', 'Graphic Design', 'Web Design', 'Adobe After Effects'],
  banner: '/static/img/jolie.png',
  path: '/projects/jolieandco'
};

export class Project_Jolie extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'><span className='h4 text-secondary'><Link to='/projects'><i className='fas fa-folder-open mr-2'></i>Projects/ </Link></span>Jolie & Co. Animated Logo</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
            I was contracted to animate the logo of Jolie & Co, a Denver based wedding stationery company and integrate it into their existing website cover page on Squarespace.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Technical Summary</h4>
            <ul>
              <li>An SVG approach was attempted, but I made the decision to move to an animated GIF because consistency across platforms, scaling, and screen sizes was guaranteed.</li>
              <li>The draw on effect was achieved by animating the stroke offset of the paths within Adobe After Effects.</li>
              <li>Any color from the stroke was a mask that would make the underlining logo calligraphy visible.</li>
              <li>Once finished, the composition was exported as a GIF that would not loop.</li>
            </ul>
            <img src='/static/img/jolieae.png' alt='' className='img-responsive rounded shadow-light'/>
            <small>Pictured: The draw on effect consisting of multiple paths with their strokes and offsets animated within the Adobe After Effects workspace.</small>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Squarespace Integration</h4>
            <p className='card-text'>
              Adding the animated logo to their cover page was as simple as including the final GIF in the flow as a vertically and horizontally centered image. The client wanted the logo to be bigger, however Squarespace's editor uses a slider to control the size of the image and it was already set to the maximum size. I got around this by using Chrome Developer Tools on the Squarespace editor and manually changing the value and maximum value of the size slider to an integer beyond what was originally intended. To my surprise this was effective and the unorthodox changes were reflected on the public site. There were no issues with styling or fixes on Squarespace's end for as long as this cover page was in service.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Demo</h4>
            <div className='embed-responsive embed-responsive-16by9'>
              <iframe title='Jolie Cover Page' src={'/static/jolie/cover.html?a=' + Math.random()} className='rounded embed-responsive-item'></iframe>
            </div>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
              <strong>UPDATE:</strong> As of July 10, 2020 the cover page with the animated logo is no longer in use by the company. 
            </p>
          </div>
        </div>
      </div>
    );
  }
}