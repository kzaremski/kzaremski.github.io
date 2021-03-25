import React from 'react';

export default class Experience extends React.Component {
  constructor() {
    super();
    
    this.experience = [
      {
        title: 'Full Stack Web Developer',
        company: 'David Clifton Ministries',
        location: 'Lakewood, CO',
        start: 'Jan 2021',
        end: 'Apr 2021',
        description: [
          'Utilized a stack consisting of MongoDB, Express.js, React, and Node.js to develop an internal web application that would be used to manage food bank recipients, their visits, incoming shipments from vendors, and then generate the reports that would be required for tax purposes, government grants, and compliance with county and state regulations.',
          'Migrated data from the existing solution built on top of Microsoft Access to the new MongoDB database.',
          'Established the production environment on a Debian server running on donated hardware located on premises.',
          'Ensured the durability of the new production data by automating a cloud backup routine for the database.',
          'Documented the application interface and technical design for end users and future developers to reference.'
        ]
      },
      {
        title: 'Retail Sales Associate, Computing Department',
        company: 'Best Buy',
        location: 'Lone Tree, CO',
        start: 'Nov 2019',
        end: 'Present',
        description: [
          'Provided a comfortable and insightful shopping experience to department patrons.',
          'Connected customers to complete solutions including additional software and accessories based on their needs.',
          'Maintained the cleanliness of display computers, floors, shelves, counters, and hidden storage in the department.'
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