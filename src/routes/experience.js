import React from 'react';

export default class Experience extends React.Component {
  constructor() {
    super();
    
    this.experience = [
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
      {
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
      },
      {
        title: '(Freelance Project) Front End Web Designer',
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
        <h1>Experience</h1>
        {
          this.experience.map((entry) =>
            <div className='card bg-primary shadow-soft border-light mb-4'>
              <div className='card-body'>
                <h4>{ entry.title }</h4>
                <p className='card-text'>
                  <i className='fas fa-building mr-2'></i>{ entry.company }<i className='fas fa-map mr-2 ml-3'></i>{ entry.location }<i className='fas fa-calendar mr-2 ml-3'></i>{ entry.start }{ entry.end ? ' - ' : ''}{ entry.end }
                </p>
                <ul className='mb-0'>
                  {
                    entry.description.map((line) =>
                      <li>{ line }</li>
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