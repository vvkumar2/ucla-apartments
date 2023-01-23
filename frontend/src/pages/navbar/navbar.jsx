import React from "react";
import "./navbar.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useUserContext from "../../context/user.context";

// Navbar component that is displayed on every page of the website.
const Navbar = () => {
    const { loggedIn } = useUserContext();
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <Link to="/" className="logo-text">
                    Website Name
                </Link>
            </div>
            <div className="navbar-links">
                <div className="dropdown">
                    <button className="dropbtn">
                        Universities <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                    <div className="dropdown-content">
                        <Link to="/ucla-listings">UCLA</Link>
                        <Link to="/ucla-listings">USC</Link>
                        <Link to="/ucla-listings">UCSD</Link>
                    </div>
                </div>
                <Link to="/liked-items" className="navbar-liked-items">
                    Liked Items
                </Link>
                {loggedIn && (
                    <Link to="/profile" className="navbar-profile-icon">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </Link>
                )}
                {!loggedIn && (
                    <Link to="/login" className="navbar-profile-icon">
                        <FontAwesomeIcon icon={faCircleUser} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
