import React, {useState} from 'react'
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

  function selectChangeHandler (event) {
    setSelectedUniversity(event.value)
  }

  function onSubmitHandler () {
    if(selectedUniversity!=="") {
      window.location.replace("/" + selectedUniversity)
    }
  }

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-content">
        <h1 className="homepage-logo">Website Name</h1>
        <h2 className="homepage-text">The number one place for college students to find housing.</h2>
        <div className="homepage-dropdown">
          <Select 
            className="dropdown-bar" 
            isClearable placeholder={"Find your University..."} 
            options={universities} 
            onChange={selectChangeHandler}
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
          <button onClick={onSubmitHandler} className="dropdown-submit">Search</button>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
