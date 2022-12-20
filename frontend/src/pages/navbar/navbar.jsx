import React from "react";
import './navbar.styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <h1 className="logo-text" onClick={() => window.location.replace("/")}>Website Name</h1>
            </div>
            <div className="navbar-links">
                {/* <a href="https://google.com" rel="noopener noreferrer" target="_blank">UCLA</a> */}
                <div className="dropdown">
                    <button className="dropbtn">Universities <FontAwesomeIcon icon={faCaretDown} /></button>
                    <div className="dropdown-content">
                        <div onClick={() => window.location.replace("/ucla-listings")}>UCLA</div>
                        <div onClick={() => window.location.replace("/ucla-listings")}>USC</div>
                        <div onClick={() => window.location.replace("/ucla-listings")}>UCSD</div>
                    </div>
                </div> 
                <div className="navbar-liked-items" onClick={() => window.location.replace("/")}>Liked Items</div>
                <div className="navbar-profile-icon" onClick={() => window.location.replace("/")}><FontAwesomeIcon icon={faCircleUser} /></div>
            </div>
        </div>
    );
};

export default Navbar;
