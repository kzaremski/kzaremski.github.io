import React from 'react';
import { Link } from 'react-router-dom';

export const Project_Groshi_Manifest = {
  title: 'Groshi Financial Platform',
  date: 'Mar 2019 - Present',
  description: 'To grow and exercise my full stack knowledge I have been building a web based stock charting and financial analysis platform sporting advanced features typically only found on heavy clients.',
  tags: ['Web Development', 'Full Stack', 'Finance', 'Personal'],
  banner: '/static/img/groshi.png',
  path: '/projects/groshi'
};

export class Project_Groshi extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'><span className='h4 text-secondary'><Link to='/projects'><i className='fas fa-folder-open mr-2'></i>Projects/ </Link></span>Groshi Financial Platform</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
              To grow and exercise my full stack knowledge I have been building a web based stock charting and financial analysis platform sporting advanced features typically only found on heavy clients. This is my main personal project
              <br/><br/>I have named the platform Groshi, a Ukranian word for money.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Technical Summary</h4>
            <ul>
              <li>The general website front end consists of pages rendered by the nunjucks templaing engine, with routing handled by ExpressJS.</li>
              <li>The app itself has a dynamic tiling interface consisting of charting, company info, news, and other info applets arranged by React Mosaic.</li>
              <li>Groshi runs on a Node.js back end using the Express.js web app framework, hosted on Microsoft Azure.</li>
              <li>User accounts, newsletter subscribers, beta keys, and other data is stored using MongoDB.</li>
              <li>Newsletter and account email verification and notifications are handled by Mailgun and their Node.js SDK.</li>
              <li>Data is pulled from the marked data provider (IEX Cloud) using their REST API, cached on Groshi’s system in a Redis cache, then redistributed to clients using my own little WebSockets wrapper as to not cause API overage charges.</li>
            </ul>
          </div>
        </div>
        <div className='card shadow-soft border-light mb-4 text-white' id='groshi-new'>
          <div className='card-body d-flex flex-row align-items-center'>
            <h5 className='my-0 d-inline-block'>Current Version (React)</h5>
            <a target='_blank' rel='noopener noreferrer' href='http://www.groshifinancial.com' className='rounded bg-info px-3 py-2 d-inline-block ml-auto'>Check It Out &#187;</a>
          </div>
        </div>
        <div className='card shadow-soft border-light mb-4 text-white' id='groshi-old'>
          <div className='card-body d-flex flex-row align-items-center'>
            <h5 className='my-0 d-inline-block'>Old Version (JQuery)</h5>
            <p className='rounded bg-dark px-3 py-2 my-0 ml-auto d-inline-block'>Offline</p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Future Plans</h4>
            <p className='card-text'>
              I am working to spread awareness about my platform and it's potential within relevant groups. If there is enough interest, my intention is to increase server capacity and follow through with a public release and fully functional product.
            </p>
          </div>
        </div>
      </div>
    );
  }
}