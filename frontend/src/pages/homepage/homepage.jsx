import React from 'react'
import Select from 'react-select'
import Navbar from "../navbar/navbar";
import './homepage.styles.css'



const universities = [
  { value: 'ucla', label: 'UCLA' },
  { value: 'usc', label: 'USC' },
  { value: 'ucsd', label: 'UCSD' },
]

const Home = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-content">
        <div className="homepage-logo">Website Name</div>
        <div className="homepage-dropdown">
          <Select 
            className="dropdown-bar" 
            isClearable placeholder={"Look for your University..."} 
            options={universities} 
            styles={{
              height: 350, minHeight:350,
              control: base => ({
                ...base,
                border: 0,
                // This line disable the blue border
                boxShadow: 'none'
              })
            }}
          />
          <button className="dropdown-submit">Search</button>
        </div>
        <div className="homepage-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
        </div>
    </div>
  );
};

export default Home;
