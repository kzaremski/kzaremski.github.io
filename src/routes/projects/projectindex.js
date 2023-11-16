import React from 'react';
import { Link } from 'react-router-dom';
import { Project_DCM } from './dcm';
// import { Project_Groshi } from './groshi';
import { Project_Jolie } from './jolie';
import { Project_RockSat2020 } from './rocksat';
import { Project_BBYSaleTracker } from './bbysaletracker';
import { Project_Hackathon2023 } from './hack23';
import { Project_AppleNotesExporter } from './applenotesexporter';

class Project extends React.Component {
  project = this.props.project;
  render() {
    return (
      <div className='card bg-primary border-light shadow-soft'>
        <div className='card-header p-3'>
          <img src={this.project.banner} className='card-img-top rounded' alt='Project Banner' />
        </div>
        <div className='card-body pt-2'>
          <div className='media d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <span className='small'><span className='far fa-calendar-alt mr-2'></span>{this.project.date}</span>
            </div>
          </div>
          <h3 className='h5 card-title mt-2 mb-2'>{this.project.title}</h3>
          <p className='card-text'>{this.project.description}</p>
          <div className='d-flex flex-row'>
            <Link to={this.project.path} className='ml-auto btn btn-primary animate-down-2'>Learn More</Link>
          </div>
        </div>
      </div>
    )
  }
}

const projects = [
  Project_Hackathon2023,
  Project_AppleNotesExporter,
  Project_BBYSaleTracker,
  Project_RockSat2020,
  Project_DCM,
  /*Project_Groshi,*/
  Project_Jolie
];

export default class ProjectIndex extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'>Projects</h1>
        <div className='row'>
          {projects.map((project) =>
            <div className='col-xl-4 col-lg-6 mb-3' key={new project().getManifest()['path']}>
              <Project project={new project().getManifest()} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const ProjectFrame = (props) => {
  return (
    <div>
      <h1 className='px-4'><span className='h4 text-secondary'><Link to='/projects'><i className='fas fa-folder-open mr-2'></i>Projects/ </Link></span>{props.title}</h1>
      {props.children}
    </div>
  );
}

export { projects, ProjectFrame };
