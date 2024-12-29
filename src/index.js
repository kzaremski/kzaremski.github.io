import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    <button className='top-link hide' id='js-top'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 6'><path d='M12 6H0l6-6z'/></svg>
    </button>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async () => {
  await sleep(200);

  // Set a variable for our button element.
  const scrollToTopButton = document.getElementById('js-top');
  
  // Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
  const scrollFunc = () => {
    // Get the current scroll value
    let y = window.scrollY;
    
    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    if (y > 0) {
      scrollToTopButton.className = 'top-link show';
    } else {
      scrollToTopButton.className = 'top-link hide';
    }
  };
  
  window.addEventListener('scroll', scrollFunc);
  
  const scrollToTop = () => {
    // Let's set a variable for the number of pixels we are from the top of the document.
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    
    // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
    // We'll also animate that scroll with requestAnimationFrame:
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      // ScrollTo takes an x and a y coordinate.
      // Increase the '10' value to get a smoother/slower scroll!
      window.scrollTo(0, c - c / 10);
    }
  };
  
  // When the button is clicked, run our ScrolltoTop function above!
  scrollToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
  });
}
