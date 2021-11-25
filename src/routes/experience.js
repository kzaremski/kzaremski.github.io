import React from 'react';

export default class Experience extends React.Component {
  constructor() {
    super();
    
    this.experience = [
      {
        title: 'Consultation Agent',
        company: 'Geek Squad',
        location: 'Lone Tree, CO',
        start: 'Jun 2021',
        end: 'Dec 2021',
        description: [
          'Provided computer support and education to clients.',
          'Documented issues and reccomendations in detail for advanced repair specialists to take over.',
          'Tested and reconditioned returned products.',
          'Delivered outstanding experiences to build long term client relationships and continued patronage'
        ]
      },
      {
        title: 'Full Stack Web Developer',
        company: 'David Clifton Ministries',
        location: 'Lakewood, CO',
        start: 'Jan 2021',
        end: 'May 2021',
        description: [
          'Implemented internal food pantry management application using React, Express, and MongoDB',
          'Migrated data from existing MS Access database.',
          'Communicated progress of project with management and met moving project requirements.',
          'Trained ministry volunteers on operation of the software.',
          'Furnished general IT support and improvements with the ministry’s network and computers.'
        ]
      },
      {
        title: 'Retail Sales Advisor',
        company: 'Best Buy',
        location: 'Lone Tree, CO',
        start: 'Nov 2019',
        end: 'Jun 2021',
        description: [
          'Connected customers to comprehensive solutions encompassing the spectrum of products, software, and services that Best Buy has to offer.',
          ' Maintained positive vendor relationships by delivering unbiased sales recommendations.'
        ]
      },
      /*{
        title: 'Web Designer & Developer',
        company: 'All Source Construction',
        location: 'Englewood, CO',
        start: 'Feb 2019',
        end: 'July 2019',
        description: [
          'Optimized existing website for better search engine visibility within their service areas.',
          'Designed and built a website for the owner’s side business that sells custom scaffolding components.',
          'Integrated payments and created a basic order management system to track web orders.',
          'Attended occasional meetings with the owners where progress updates were given, and plans were drafted.',
        ]
      },*/
      {
        title: <>Front End Web Designer<span className='ml-2 small bg-dark text-white p-1 rounded-lg'>Project</span></>,
        company: 'Jolie Stationary',
        location: 'Denver, CO',
        start: 'Oct 2017',
        description: [
          'Created cover page for the client’s site www.jolieandco.com.',
          'Animated logo calligraphy with Adobe After Effects from Adobe Illustrator source files.',
          'Optimized final animation to run smoothly on smartphones and tablets.',
          'Integrated cover page with pre-existing Squarespace site and used various workarounds to go beyond Squarespace’s styling restrictions.'
        ]
      },
    ];
  }

  render() {
    return (
      <div>
        <h1 className='px-4'>Experience</h1>
        {
          this.experience.map((entry) =>
            <div className='card bg-primary shadow-soft border-light mb-4' key={ entry.title + entry.company }>
              <div className='card-body'>
                <h4>{ entry.title }</h4>
                <p className='card-text'>
                  <i className='fas fa-building mr-2'></i>{ entry.company }<i className='fas fa-map mr-2 ml-3'></i>{ entry.location }<i className='fas fa-calendar mr-2 ml-3'></i>{ entry.start }{ entry.end ? ' - ' : ''}{ entry.end }
                </p>
                <ul className='mb-0'>
                  {
                    entry.description.map((line) =>
                      <li key={ entry.title + entry.company + line}>{ line }</li>
                    )
                  }
                </ul>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}