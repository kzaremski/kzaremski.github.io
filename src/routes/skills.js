import React from 'react';

export default class Skills extends React.Component {
  constructor() {
    super();
    
    this.skills = {
      tools: ['Git', 'Subversion', 'UNIX/Linux Environments (Debian, Ubuntu, RHEL & CentOS)', 'GitHub', 'Adobe Creative Cloud', 'Shopify', 'Microsoft Office', 'Shell Scripting', 'Visual Studio', 'Windows Server', 'Microsoft Azure'],
      technologies: ['Node.js', 'Express.js', 'React', 'JQuery', 'AJAX', 'REST', 'JSON', 'Bootstrap', 'HTML5 Canvas', 'Babel', 'Webpack', 'Nunjucks', 'WordPress', 'WebSockets', 'Stripe Payments (API & webhooks)'],
      languages: ['JavaScript', 'HTML5', 'CSS/SCSS', 'Python', 'SQL'],
      databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'],
      expertise: ['Full Stack Web Development', 'Responsive Web Design', 'Data Visualization', 'Retail Sales', 'Frontend Web Development', 'Web Applications']
    }
  }

  render() {
    return (
      <div>
        <h1 className='px-4'>Skills</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Applications & Tools</h4>
            <div className='card-text mt-3'>
              {
                this.skills.tools.map((tool) =>
                  <div key={ tool } className='rounded border-light px-3 py-1 mb-2 bg-primary shadow-inset mr-2 d-inline-block text-info font-weight-bold'>{ tool }</div>
                )
              }
            </div>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Technologies</h4>
            <div className='card-text mt-3'>
              {
                this.skills.technologies.map((technology) =>
                  <div key={ technology } className='rounded border-light px-3 py-1 mb-2 bg-primary shadow-inset mr-2 d-inline-block text-success font-weight-bold'>{ technology }</div>
                )
              }
            </div>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Languages</h4>
            <div className='card-text mt-3'>
              {
                this.skills.languages.map((language) =>
                  <div key={ language } className='rounded border-light px-3 py-1 mb-2 bg-primary shadow-inset mr-2 d-inline-block text-secondary font-weight-bold'>{ language }</div>
                )
              }
            </div>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Databases</h4>
            <div className='card-text mt-3'>
              {
                this.skills.databases.map((database) =>
                  <div key={ database } className='rounded border-light px-3 py-1 mb-2 bg-primary shadow-inset mr-2 d-inline-block font-weight-bold'>{ database }</div>
                )
              }
            </div>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Industry Expertise</h4>
            <div className='card-text mt-3'>
              {
                this.skills.expertise.map((expertise) =>
                  <div key={ expertise } className='rounded border-light px-3 py-1 mb-2 bg-primary shadow-inset mr-2 d-inline-block text-danger font-weight-bold'>{ expertise }</div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}