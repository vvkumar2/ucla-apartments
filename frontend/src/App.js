import React, { useState, useEffect } from "react";
import Listings from './pages/listings/listings';
import './App.css';

function App() {
  // Crete states for search fields
  const [searchField, setSearchField] = useState("");
  const [bedField, setBedField] = useState(NaN);
  const [bathField, setBathField] = useState(NaN);
  const [minRentField, setMinRentField] = useState(NaN);
  const [maxRentField, setMaxRentField] = useState(NaN);

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
    var newFilteredApartments = apartments.filter((apartment) => {
      return apartment.name.toLocaleLowerCase().includes(searchField)
    });

    if (!isNaN(bedField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.bed === bedField
      });
    }

    if (!isNaN(bathField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.bath === bathField
      });
    }

    if (!isNaN(minRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.rent >= minRentField
      });
    }

    if (!isNaN(maxRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.rent <= maxRentField
      });
    }

    setFilteredApartments(newFilteredApartments)
  }, [apartments, searchField, bedField, bathField, minRentField, maxRentField])

  // On search handler for search field
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }
  const onBedChange = (event) => {
    const bedFieldString = event.target.value;
    setBedField(parseFloat(bedFieldString, 10));
  }
  const onBathChange = (event) => {
    const bathFieldString = event.target.value;
    setBathField(parseFloat(bathFieldString, 10));
  }
  const onMinRentChange = (event) => {
    const minRent = event.target.value;
    setMinRentField(parseFloat(minRent, 10));
  }
  const onMaxRentChange = (event) => {
    const maxRent = event.target.value;
    setMaxRentField(parseFloat(maxRent, 10));
  }


  return (
    <div className="App">
      <Listings apartment_list={filteredApartments}
        searchFieldChangeHandler={onSearchChange} 
        bedFieldChangeHandler={onBedChange} 
        bathFieldChangeHandler={onBathChange}
        minRentChangeHandler={onMinRentChange}
        maxRentChangeHandler={onMaxRentChange}
        numListings={filteredApartments.length}/>
    </div>
  );
}

export default App;
