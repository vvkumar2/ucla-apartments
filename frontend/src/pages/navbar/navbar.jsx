import React from "react";
import './navbar.styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <h1 className="logo-text">Website Name</h1>
            </div>
            <div className="navbar-links">
                <a href="https://google.com" rel="noopener noreferrer" target="_blank">UCLA</a>
                <a href="https://google.com" rel="noopener noreferrer" target="_blank">Liked Items</a>
                <a className="navbar-profile-icon" href="https://google.com" rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={faCircleUser} /></a>
            </div>
        </div>
    );
};

export default Navbar;
