import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='card bg-primary shadow-soft border-light mt-6' id='stickysidebar'>
            <div className='profile-image bg-primary shadow-inset border border-light rounded p-3 ml-3 mt-n5'>
                <img src='/pfp.jpg' className='card-img-top rounded' alt='Konstantin' />
            </div>
            <div className='card-body'>
                <h3 className='h5 mb-1 font-weight-bold'>Konstantin Zaremski</h3>
                <span className='h6 font-weight-normal text-gray'>Computer Science Student</span>
                <p className='card-text text-secondary mt-2'><i className='fas fa-map-marker mr-1'></i> Denver, Colorado</p>
                <div className='list-group shadow-inset rounded'>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/'><i className='fas fa-address-card mr-2'></i>Introduction</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/education'><i className='fas fa-graduation-cap mr-2'></i>Education</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/experience'><i className='fas fa-briefcase mr-2'></i>Experience</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/skills'><i className='fas fa-pencil-ruler mr-2'></i>Skills</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/projects'><i className='fas fa-project-diagram mr-2'></i>Projects</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/awards'><i className='fas fa-award mr-2'></i>Awards</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'list-group-item py-2 bg-secondary text-white' : 'list-group-item py-2')} to='/contact'><i className='fas fa-phone mr-2'></i>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
