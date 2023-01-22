import React, { useState } from 'react'
import Select from 'react-select'
import Navbar from "../navbar/navbar";
import './homepage.styles.css'

const universities = [
  { value: 'ucla-listings', label: 'UCLA' },
  { value: 'usc-listings', label: 'USC' },
  { value: 'ucsd-listings', label: 'UCSD' },
]

const Home = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  // Sets state the user selects a university from the dropdown
  function selectChangeHandler (event) {
    if (event!==null) {
      setSelectedUniversity(event.value)
    }
  }

  // Redirects the user to the listings page for the selected university
  function onSubmitHandler () {
    if(selectedUniversity!=="") {
      window.location.replace("/" + selectedUniversity)
    }
  }


  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-content">
        <div className="homepage-logo">Website Name</div>
        <div className="homepage-text">Helping students find their perfect home.</div>
        <div className="homepage-dropdown">
          <Select 
            className="dropdown-bar" 
            isClearable
            placeholder={"Find your University..."} 
            options={universities} 
            onChange={selectChangeHandler}
            styles={{
              height: 350, minHeight:350,
              control: base => ({
                ...base,
                border: 0,
                // Disables the blue border
                boxShadow: 'none'
              })
            }}
          />
          <button onClick={onSubmitHandler} className="dropdown-submit">Search</button>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
