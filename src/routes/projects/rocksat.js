import React from 'react';
import { Link } from 'react-router-dom';

export class Project_RockSat2020 extends React.Component {
  manifest = {
    title: 'RockSat 2020',
    date: 'May 2021',
    description: 'The joint Arapahoe Community College and Red Rocks Community College RockSat 2020 team brought me on in early May to help with the final software integration for their RockSat 2020 mission payload.',
    tags: ['Web Development', 'Internal Application', 'MongoDB', 'Full Stack', 'Web Design'],
    banner: '/static/img/rocksat.jpg',
    path: '/projects/rocksat'
  }

  getManifest() { return this.manifest }

  render() {
    return (
      <div>
        <h1 className='px-4'><span className='h4 text-secondary'><Link to='/projects'><i className='fas fa-folder-open mr-2'></i>Projects/ </Link></span>RockSat-X 2020</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>
              I was brought on in May 2021 to help with the final integration of Red Rocks Community College and Arapahoe Community College’s payload for the RockSat 2020 mission.
            </p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Mission</h4>
            <p>The team's payload is called VRSE (Virtual Reality Space Experience), which extends an arm with a camera 16" out from the body of the rocket to record a short video at the highest point in the rocket’s orbit. The timing for extension/retraction of the arm</p>
            <strong>Flight Timeline:</strong>
            <ul>
              <li>30 seconds before launch (T-30s) power is applied to all payloads on the rocket. The VRSE's computer boots up and begins to listen for further signals.</li>
              <li>85 seconds after launch (T+85s) power is applied to the first timer event line triggering arm extension and starts camera recording.</li>
              <li>261 seconds after launch (T+261s) power is applied to the second timer event line which triggers arm retraction, stops camera recording, and transfers a low resolution copy of the camera video to the computer for redundancy.</li>
              <li>330 seconds after launch (T+330s) power is applied to the third and final timer event line which starts the safe shutdown of the computer and all other electronic systems in preparation for re-entry.</li>
            </ul>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>My Contributions</h4>
            <p>I was recommended to the team because of my experience with Python and Linux.</p>
            <ul>
              <li>I refactored the existing code for camera and arm control to be more robust by adding a logging method, implementing concurrent arm extension and recording using threads, and properly handling exceptions among other improvements.</li>
              <li>I applied my Linux system administration skills to create a systemd service unit file that would allow for the control script to start as a part of the control computer's boot process.</li>
              <li>I incorporated the camera mounting and video transfer into the Python script and had it copy files more dynamically to account for system clock inaccuracies.</li>
            </ul>
            <img src='/static/img/rocksatselfie.png' alt='' className='img-responsive rounded shadow-light'/>
            <small>The fully assembled payload and I after a successful test.</small>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <h4>Conclusion</h4>
            <p className='card-text'>
              NASA will be conducting their own tests on the physical tolerances of the payload to a variety of forces over the course of the summer (2021).
              The RockSat 2020 mission will launch from the NASA Wallops Flight Facility, Virginia in August of 2021.
            </p>
          </div>
        </div>
      </div>
    );
  }
}