import React from 'react';
import {Link} from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className='PageNotFound innerPage'>
        <div>
            <h2>404</h2>
            <p>Page Not Found</p>
            <Link to='/stepper_form' className='btn_returnToHome'> Return to Add Form</Link>
        </div>
    </div>
  )
}

export default PageNotFound