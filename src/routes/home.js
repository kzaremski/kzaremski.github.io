import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 className='px-4'>Introduction</h1>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>Hello! My name is Konstantin and I am a budding web developer currently studying computer science.</p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>I am a fast learning and technology-obsessed young professional with exposure covering the gamut of web and related technologies from the front end to the back end. This has been my passion from an early age. Beyond code, I have an eye for the visual, and a drive to see projects through to fulfillment. I am seeking entry level positions in order to grow my knowledge while gaining relevant experience in the industry.</p>
          </div>
        </div>
        <div className='card bg-primary shadow-soft border-light mb-4'>
          <div className='card-body'>
            <p className='card-text'>Let's connect and bring your sketches, concepts, and goals to fruition.</p>
          </div>
        </div>
      </div>
    );
  }
}