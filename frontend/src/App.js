import React, { useState, useEffect } from "react";
import Listings from './pages/listings/listings';
import './App.css';

function App() {
  // Crete states for search fields
  const [searchField, setSearchField] = useState("");

  // States for apartment lists
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState(apartments)

  // Fetching the api from flask server
  // and will be redirected to proxy
  useEffect(() => {
    fetch("/data")
    .then((response) => response.json())
    .then((elements) => setApartments(elements))
  }, []);

  // Filter apartments based on search field
  useEffect(() => {
    const newFilteredApartments = apartments.filter((apartment) => {
      return apartment.name.toLocaleLowerCase().includes(searchField)
    });
    
    setFilteredApartments(newFilteredApartments)
  }, [apartments, searchField])

  // On search handler for search field
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <Listings apartment_list={filteredApartments} searchFieldChangeHandler={onSearchChange}/>
    </div>
  );
}

export default App;
