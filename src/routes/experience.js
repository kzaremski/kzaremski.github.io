import React from 'react';

export default class Experience extends React.Component {
  constructor() {
    super();
    
    this.experience = [
      {
        title: 'Consultation Agent',
        company: 'Geek Squad',
        location: 'Lone Tree, CO',
        start: 'December 2022',
        end: 'Present',
        description: [
          'Providing outstanding computer support and education to clients, ensuring long term relationships and patronage.',
          'Documenting issues and recommendations in detail for other technicians to take over.'
        ]
      },
      {
        title: 'Frontend Developer',
        company: 'NCH Software',
        location: 'Greenwood Village, CO',
        start: 'December 2021',
        end: 'March 2022',
        description: [
          'Performed frontend feature updates, maintenance, and bug fixes for the Brisk Cloudware family of business web applications.',
          'Implemented in-house branded subscription management UI supplanting the default Stripe views.',
          'Manifested outstanding user experiences through style and functional overhauls.',
          'Collaborated with other developers and management in every step of the development lifecycle.',
          'Capitalized on prior experience to perform Linux and Windows server administration tasks.'
        ]
      },
      {
        title: 'Consultation Agent',
        company: 'Geek Squad',
        location: 'Lone Tree, CO',
        start: 'June 2021',
        end: 'December 2021',
        description: [
          'Provided computer support and education to clients.',
          'Documented issues and recommendations in detail for advanced repair specialists to take over.',
          'Tested and reconditioned returned products.',
          'Delivered outstanding experiences to build long term client relationships and enduring patronage.'
        ]
      },
      {
        title: <>Full Stack Web Developer <span className='ml-2 bg-dark text-white p-1 rounded-lg' style={{fontSize: '0.5em'}}>Single Project Basis</span></>,
        company: 'David Clifton Ministries',
        location: 'Lakewood, CO',
        start: 'January 2021',
        end: 'May 2021',
        description: [
          'Implemented internal food pantry management application using React, Express, and MongoDB.',
          'Migrated data from existing MS Access database.',
          'Communicated progress of project with management and met moving project requirements.',
          'Trained ministry volunteers on operation of the software.',
          'Furnished general IT support and improvements with the ministry\'s network and computers.'
        ]
      },
      {
        title: 'Retail Sales Advisor',
        company: 'Best Buy',
        location: 'Lone Tree, CO',
        start: 'November 2019',
        end: 'June 2021',
        description: [
          'Connected customers to comprehensive solutions encompassing the spectrum of products, software, and services that Best Buy has to offer.',
          'Maintained positive vendor relationships by delivering unbiased sales recommendations.'
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
        title: <>Web Designer <span className='ml-2 bg-dark text-white p-1 rounded-lg' style={{fontSize: '0.5em'}}>Single Project Basis</span></>,
        company: 'Jolie Stationary',
        location: 'Denver, CO',
        start: 'October 2017',
        description: [
          'Created cover page for the client\'s site www.jolieandco.com.',
          'Animated logo calligraphy with Adobe After Effects from Adobe Illustrator source files.',
          'Optimized final animation to run smoothly on smartphones and tablets.',
          'Integrated cover page with pre-existing Squarespace site and used various workarounds to go beyond Squarespace\'s styling restrictions.'
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
                  <span className='avoidwrap mr-3'><i className='fas fa-building mr-2'></i>{ entry.company }</span>
                  <span className='avoidwrap mr-3'><i className='fas fa-map mr-2'></i>{ entry.location }</span>
                  <span className='avoidwrap mr-3'><i className='fas fa-calendar mr-2'></i>{ entry.start }{ entry.end ? ' - ' : ''}{ entry.end }</span>
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