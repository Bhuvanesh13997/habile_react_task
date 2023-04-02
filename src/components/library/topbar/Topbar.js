import React from 'react';
import { Link } from "react-router-dom";
import './Topbar.css';

function Topbar() {

  let firstName = "Gregory";
  let lastName ="Clark";

  return (
    <header className='topbar'>
        <div className='brand'>
            <div className='logo'>
                CB
            </div>
            <span>CloudBank.in</span>
        </div>

        <div className="dropdown">
            <button className="dropbtn">
                <span className='firstLetters'>{firstName.charAt() + lastName.charAt()}</span>
                <span className='username'>{`${firstName} ${lastName}`}</span>
            </button>
            <div className="dropdown-content">
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Logout</Link>
            </div>
        </div>

    </header>
  )
}

export default Topbar