import React from 'react';

export default class Contact extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'>Contact</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>While I'm not going to put my email or phone number in plain view, if you feel that I would be a good fit for a position or project of yours don't hesitate to reach out to me through LinkedIn or Facebook Messenger.</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 mb-4'><a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/konstantinzaremski' className='btn btn-primary animate-down-2 d-block text-secondary'><i className='fab fa-linkedin mr-2'></i>LinkedIn</a></div>
          <div className='col-md-4 mb-4'><a target='_blank' rel='noopener noreferrer' href='https://www.github.com/kzaremski' className='btn btn-primary animate-down-2 d-block text-warning'><i className='fab fa-github mr-2'></i>GitHub</a></div>
          <div className='col-md-4 mb-4'><a target='_blank' rel='noopener noreferrer' href='http://m.me/konstantin.zaremski' className='btn btn-primary animate-down-2 d-block text-danger'><i className='fab fa-facebook-messenger mr-2'></i>Messenger</a></div>
        </div>
      </div>
    );
  }
}