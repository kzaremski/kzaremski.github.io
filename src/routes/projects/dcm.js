import React from 'react';
import { Link } from 'react-router-dom';

export class Project_DCM extends React.Component {
  manifest = {
    title: 'David Clifton Ministries Food Pantry',
    date: 'Jan 2021 - May 2021',
    description: 'I was tasked with building a web-based internal application that would replace their aging MS Access solution used to manage food pantry clients, visits, inventory, etc.',
    tags: ['Web Development', 'JavaScript', 'Internal Application', 'MongoDB', 'Full Stack', 'Web Design'],
    banner: '/static/img/dcm.png',
    path: '/projects/davidcliftonministries'
  }

  getManifest() { return this.manifest }

  render() {
    return (
      <div>
        <h1 className='px-4'><span className='h4 text-secondary'><Link to='/projects'><i className='fas fa-folder-open mr-2'></i>Projects/ </Link></span>DCM Internal Food Pantry Mangement Application</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Problem &amp; Scope</h4>
            <p>
              Food pantries and charities around the country are required to keep records on the people they serve and the frequency that they receive benefits.
              I was tasked with rebuilding their existing solution built on top of Microsoft Access as an internal web application.
            </p>
            <strong>Core Features:</strong>
            <ul>
              <li>Multiple user accounts with concurrent access.</li>
              <li>Record new food bank clients and their personal information.</li>
              <li>Document client visits and enforce limits on their frequency and identification methods.</li>
              <li>Track new inventory being received by the food bank.</li>
              <li>Generate and export reports for variety of metrics regarding clients, visits, and inventory.</li>
            </ul>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Front End</h4>
            <p>
              I opted for a single page application built in React as it is especially suited for complex, multi-layer applications like this.
              Once the JavaScript bundle is loaded, it feels like a desktop application.
            </p>
            <p>
              Application styling and layout is handled by Bootstrap 5 with a custom sidebar ribbon component for navigation.
              I wanted the application to be easy to navigate and not overwhelming so I implemented the ribbon with only a handful of broader categories/sections.
              More specific functions can be accessed from their respective category's main screen.
            </p>
            <h5>Intake Screen</h5>
            <img src='/static/img/dcmintake.png' alt='' className='img-responsive rounded shadow-light'/>
            <p>
              This is the top level screen for the intake category.
              From this view the user can move to create a new client record, view upcoming scheduled visits today, or find existing client records to take action on.
            </p>
            <h5>Receive Inventory Screen</h5>
            <img src='/static/img/dcminventory.png' alt='' className='img-responsive rounded shadow-light'/>
            <p>
              This is the applet responsible for recording new shipments of inventory to the food bank.
              The UPC input can be selected and a USB barcode scanner can be used to scan in products individually.
              Product definitions can be redefined on the fly and a database of products is dynamically built as they are defined because using a third party UPC API is cost prohibitive.
            </p>
            <p>
              Additional screenshots are available upon request.
              I can only share small snippets of the code.
              This is a real application that I built for an organization and is running in a production environment.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Back End</h4>
            <p>
              I chose to implement the backend in Node.js using the ExpressJS framework.
              Data is stored in a MongoDB database for its parity with the rest of the JavaScript stack.
            </p>
            <p>
              An NGINX instance acts as a reverse proxy for the Node.js service.
              The DCM service runs as a dedicated non-privileged user so that any code execution exploits do not affect the broader system.
            </p>
            <img src='/static/img/dcmserver.png' alt='' className='img-responsive rounded shadow-light'/>
            <small>Pictured: Setting up the Debian server on a desktop PC that was donated to the church.</small>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Data Migration</h4>
            <p className='card-text'>
              To migrate data from the existing Microsoft Access application to the new MongoDB database, the data was manually exported from the Access tables into a standard XML file using the export data menu in Access.
              I assembled a set of one-off python scripts that would read in these XML files, remap their fields to the new fields present in the MongoDB database, and then push those entries document by document to the new database.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Future</h4>
            <p>
              Although I now have a lesser involvement with the ministry directly, I periodically continue to provide support and small updates.
              I designed a modular database architecture that can accomodate additional applications for the ministry beyond the food bank management program.
            </p>
            <p className='card-text'>
              As I built the platform I documented both my technical decisions as well as instructions for future developers and end users to reference.
            </p>
          </div>
        </div>
      </div>
    );
  }
}