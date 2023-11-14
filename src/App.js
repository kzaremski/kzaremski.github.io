import { Routes, Route } from 'react-router-dom';

import Sidebar from './Sidebar';

import Contact from './routes/contact';
import Education from './routes/education';
import Experience from './routes/experience';
import Home from './routes/home';
import ProjectIndex from './routes/projects/projectindex';
import { projects } from './routes/projects/projectindex';
import Awards from './routes/awards';
import Skills from './routes/skills';

function App() {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5 col-lg-4'>
            <Sidebar/>
          </div>
          <div className='col-md-7 col-lg-8 pt-5'>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/education' element={<Education/>} />
              <Route path='/skills' element={<Skills/>} />
              <Route path='/projects' element={<ProjectIndex/>} />
              { projects.map((Project) =>
                <Route path={new Project().getManifest()['path']} element={<Project/>} key={new Project().getManifest()['path']}/>
              ) }
              <Route path='/awards' element={<Awards/>} />
              <Route path='/experience' element={<Experience/>} />
              <Route path='/contact' element={<Contact/>} />
            </Routes>
          </div>
        </div>
      </div>
      <div className='container mt-3'>
        <p className='text-center'>
          Copyright &copy; 2020-{new Date().toISOString().substring(0, 4)} Konstantin Zaremski &mdash; All rights reserved.
          Styles by <a href="https://github.com/themesberg/neumorphism-ui-bootstrap/tree/master" target="_blank" rel='noreferrer'>Neumorphism UI Bootstrap</a>.
        </p>
      </div>
    </>
  );
}

export default App;
