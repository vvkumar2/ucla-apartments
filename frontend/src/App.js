import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from './pages/listings/listings';
import Home from "./pages/homepage/homepage";
import './App.css';
import apartment_data from "./data/apartment_data.json";


function App() {
  // Crete states for sort by field
  const [sortBy, setSortBy] = useState("");

  // Crete states for search fields
  const [searchField, setSearchField] = useState("");
  const [bedField, setBedField] = useState(NaN);
  const [bathField, setBathField] = useState(NaN);
  const [minRentField, setMinRentField] = useState(NaN);
  const [maxRentField, setMaxRentField] = useState(NaN);

  // States for apartment lists
  const [apartments] = useState(apartment_data);
  const [filteredApartments, setFilteredApartments] = useState(apartments);

  // Filter apartments based on search field
  useEffect(() => {
    var newFilteredApartments = apartments.filter((apartment) => {
      return apartment.name.toLocaleLowerCase().includes(searchField);
    });

    if (sortBy !== "") {
      if (sortBy==="price_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) =>
          a["rent"] - b["rent"]
        );
      }
      if (sortBy==="sqft_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) =>
          a["sqft"] - b["sqft"]
        );
      }
      if (sortBy==="price_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) =>
          b["rent"] - a["rent"]
        );
      }
      if (sortBy==="sqft_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) =>
          b["sqft"] - a["sqft"]
        );
      }
      if (sortBy==="distance") {
        newFilteredApartments = newFilteredApartments.sort((a, b) =>
          a["distance"] - b["distance"]
        );
      }
    }

    if (!isNaN(bedField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.bed === bedField;
      });
    }

    if (!isNaN(bathField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.bath === bathField;
      });
    }

    if (!isNaN(minRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.rent >= minRentField;
      });
    }

    if (!isNaN(maxRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.rent <= maxRentField;
      });
    }


    setFilteredApartments(newFilteredApartments);
  }, [
    apartments,
    searchField,
    bedField,
    bathField,
    minRentField,
    maxRentField,
  ]);

  // On search handler for "Sort By" filter
  const sortByChangeHandler = (event) => {
    const sortByString = event.target.value.toLocaleLowerCase();
    setSortBy(sortByString);
  }
  // On search handler for search field
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onBedChange = (event) => {
    const bedFieldString = event.target.value;
    setBedField(parseFloat(bedFieldString, 10));
  };
  const onBathChange = (event) => {
    const bathFieldString = event.target.value;
    setBathField(parseFloat(bathFieldString, 10));
  };
  const onMinRentChange = (event) => {
    const minRent = event.target.value;
    setMinRentField(parseFloat(minRent, 10));
  };
  const onMaxRentChange = (event) => {
    const maxRent = event.target.value;
    setMaxRentField(parseFloat(maxRent, 10));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Home/>} />
          <Route path="ucla-listings" element={
            <Listings apartmentList={filteredApartments}
              sortByChangeHandler={sortByChangeHandler}
              searchFieldChangeHandler={onSearchChange} 
              bedFieldChangeHandler={onBedChange} 
              bathFieldChangeHandler={onBathChange}
              minRentChangeHandler={onMinRentChange}
              maxRentChangeHandler={onMaxRentChange}
              numListings={filteredApartments.length}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
