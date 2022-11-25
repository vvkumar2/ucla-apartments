import React from "react";
// import { Spin as Hamburger } from 'hamburger-react'

import './navbar.styles.css'


const Navbar = () => {
    // const [isOpen, setOpen] = useState(false)
    // const classes = isOpen ? 'hamburger-show' : 'hamburger-show-hide'

    return (
        <div className="navbar-container">
            <div className="logo-container">
                <h1 className="logo-text">Website Name</h1>
            </div>
            {/* <div className="navbar-hamburger">
                <div className="hamburger-button">
                    <Hamburger color="black" toggled={isOpen} toggle={setOpen}/>
                </div>
                <div className={classes}>
                    <ul className="hamburger-links">
                        <div>About</div>
                        <div>Experience</div>
                        <div>Projects</div>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Navbar;
