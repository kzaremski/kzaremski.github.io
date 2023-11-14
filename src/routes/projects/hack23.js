import React from 'react';
//import { Link } from 'react-router-dom';
import { ProjectFrame } from './projectindex';

const LiveDemoSection = () => {
  return (
    <div className='card shadow-soft border-light mb-4 text-white' style={{
      "backgroundSize": "cover",
      "backgroundImage": "url('/static/img/uconnect-bg.jpg')"
    }}>
      <div className='card-body d-flex flex-row align-items-center'>
        <div className='d-inline-block p-1 px-3 rounded' style={{
          "backgroundColor": "rgba(0, 0, 0, 0.5)",
        }}>
          <h5 className='my-0'>Live Demo</h5>
        </div>
        <a target='_blank' rel='noreferrer' href='https://uconnect.ddns.net' className='rounded bg-info px-3 py-2 d-inline-block ml-auto'>Check It Out &#187;</a>
      </div>
    </div>
  )
}

export class Project_Hackathon2023 extends React.Component {
  manifest = {
    title: 'MSU-DU Hackathon 2023 (uConnect)',
    date: 'October 2023',
    description: 'Over 30 hours, I and a team of 4 other people built a multi-university event aggregator website with Node.js and MongoDB.',
    tags: ['Web Development', 'Bootstrap', 'Node.js', 'MongoDB', 'Full Stack', 'Web Design'],
    banner: '/static/img/hack23.png',
    path: '/projects/hack23'
  }

  getManifest() { return this.manifest }

  render() {
    return (
      <ProjectFrame title="MSU-DU Joint Hackathon 2023 (uConnect)">
        
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
              Over 30 hours, I and a team of 4 other people built a multi-university event aggregator website with Node.js and MongoDB.
              We called our project/website <i>uConnect</i>.
            </p>
          </div>
        </div>

        <LiveDemoSection/>

        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Problem</h4>
            <p className='card-text'>
              Engagement outside of class is low at commuter universities like Metropolitan State University of Denver or University of Colorado Denver.
              Furthermore, cross-campus events such as this very hackathon are not visible to students.
              Sometimes university campus events are open to students and or other people outside of the student body of the hosting institution, and there is no good way of advertising these kinds of events for outsiders.
            </p>
          </div>
        </div>

        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Solution</h4>
            <p className='card-text'>
              To promote higher engagement with events on campus and between campuses, we propose a multi-campus event aggregator website.
            </p>
            <h5>Features & Functionality</h5>
            <ul className='card-text'>
              <li>Events from all participating colleges and universities.</li>
              <ul>
                <li>Their respective event feeds will be scraped so that the site is pre-populated and continuously updated with new events and content.</li>
              </ul>
              <li>Different feeds to find events that interest you.</li>
              <ul>
                <li><b>For You:</b> Recommended events based on your profile.</li>
                <li><b>Popular:</b> The most popular upcoming events as determined by the number of people that sign up for them.</li>
                <li><b>Recent:</b> The most recently posted or added events.</li>
                <li><b>Upcoming:</b> Events that are starting soonest to the current time.</li>
              </ul>
              <li>Event search functionality.</li>
              <li>Account creation and profile.</li>
              <ul>
                <li>View the events that you are registered for.</li>
              </ul>
              <li>Sign Up For Events.</li>
              <ul>
                <li>Register for events that you would like to attend directly in uConnect.</li>
                <li>See the breakdown of which other institutions people are coming from.</li>
              </ul>
            </ul>
          </div>
        </div>
        
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Technical Approach</h4>
            <p>Since I had the most programming experience out of the other team members and also had experience implementing web applications end-to-end, I stepped up to provide the technical direction for the project's implementation.</p>
            <ul className='card-text'>
              <li>The backend is a standard Express.js/Node.js app.</li>
              <li>Events, user accounts, and other data is stored in MongoDB and accessed in Node.js using the <b>mongoose</b> library.</li>
              <li>Scraping of the events is done by scraping each university's respective ICS calendar feed using the <b>node-ics</b> library.</li>
              <ul>
                <li>These events are stored in our database and scraping only happens once a day.</li>
              </ul>
              <li>Since one of the team members did not have any front end JavaScript experience going into the project, I configured backend to make use of server side rendering using <b>nunjucks</b>.</li>
              <li>Front end style and layout is handled by Bootstrap 5.</li>
            </ul>
          </div>
        </div>

        <LiveDemoSection/>

        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Screenshots</h4>
            <img src='/static/img/uconnect-home.png' alt='Home page' className='img-responsive rounded shadow-light'/>
            <small>Home page, also shows the bar breaking down the participation by members of different institutions.</small>
            <br/>
            <br/>
            <img src='/static/img/uconnect-event.png' alt='Event page' className='img-responsive rounded shadow-light'/>
            <small>An event page for an event already registered for by the logged-in user.</small>
            <br/>
            <br/>
            <img src='/static/img/uconnect-search.png' alt='Search page' className='img-responsive rounded shadow-light'/>
            <small>Search engine in action.</small>
          </div>
        </div>

        <LiveDemoSection/>

        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>What Didn't Get Done?</h4>
            <p>Given the limited amount of time provided by the competition, naturally there were a number of features that did not get finished in time for judging.</p>
            <ul className='card-text'>
              <li>Event creation and management functionality for event organizers.</li>
              <li>Content moderation and event or user reporting functionality.</li>
              <li>Admin panel or site/user management functionality.</li>
              <li>For You feed algorithm.</li>
              <li>User profile settings (name, email, password change, etc).</li>
              <li><i>Other features and functionality limiting this from being a fully production-ready product...</i></li>
            </ul>
            <p className='card-text'>
              We have expressed interest in fully fleshing out the project.
              Any future plans or work would be determined by interest from faculty.
            </p>
          </div>
        </div>

        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Judging</h4>
            <p>
              Once coding time ended and final commits were made, a panel of judges came around to look at presentations and demonstrations by the different teams.
              Projects were evaluated by both their idea as well as whatever working progress was made.
            </p>
            <p className='card-text'>
              After a long judging period, our team was awarded first place (tying for first with another team's mobile app project).
            </p>
            <img src='/static/img/hack23-winners.png' alt='Winners' className='img-responsive rounded shadow-light'/>
            <small>Winners!</small>
            <p className='card-text mt-2'>
              We have expressed interest in fully finishing the project.
              Any future plans or work would be determined by interest from faculty.
            </p>
          </div>
        </div>

        <LiveDemoSection/>

        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Source Code</h4>
            <p className='card-text'>
              Project source code and other information is available on GitHub: <br/>
              <a href='https://github.com/kzaremski/msu-du-hack23-multi-campus-events-hub' target='_blank' rel='noreferrer' className='text-secondary'>https://github.com/kzaremski/msu-du-hack23-multi-campus-events-hub</a>
            </p>
          </div>
        </div>

      </ProjectFrame>
    );
  }
}