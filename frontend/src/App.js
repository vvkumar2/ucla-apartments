import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage/homepage";
import Listings from "./pages/listings/listings";
import Profile from "./pages/profile/profile";

import apartment_data from "./data/apartment_data.json";

import "./App.css";

function getMinValue(inputString) {
  if (inputString.includes("$")) {
    inputString = inputString.replaceAll("$", "");
  }
  if (inputString.includes("-")) {
    inputString = inputString.substr(0, inputString.indexOf("-") - 1);
  }
  if (inputString.includes(",")) {
    inputString = inputString.replaceAll(",", "");
  }
  if (inputString === "Call for Rent" || inputString === "") {
    inputString = "100000";
  }

  return parseFloat(inputString, 10);
}

function getMaxValue(inputString) {
  if (inputString.includes("$")) {
    inputString = inputString.replaceAll("$", "");
  }
  if (inputString.includes("-")) {
    inputString = inputString.substr(
      inputString.indexOf("-") + 1,
      inputString.length
    );
  }
  if (inputString.includes(",")) {
    inputString = inputString.replaceAll(",", "");
  }
  if (inputString === "Call for Rent" || inputString === "") {
    inputString = "0";
  }

  return parseFloat(inputString, 10);
}

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
      if (sortBy === "price_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinValue(a["rent"]) - getMinValue(b["rent"]);
        });
      }
      if (sortBy === "sqft_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinValue(a["sqft"]) - getMinValue(b["sqft"]);
        });
      }
      if (sortBy === "price_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxValue(b["rent"]) - getMaxValue(a["rent"]);
        });
      }
      if (sortBy === "sqft_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxValue(b["sqft"]) - getMaxValue(a["sqft"]);
        });
      }
      if (sortBy === "distance") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          let dista = a["distance"];
          let distb = b["distance"];
          return dista - distb;
        });
      }
    }

    if (!isNaN(bedField) && bedField !== "") {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        const min_beds = getMinValue(apartment.beds);
        const max_beds = getMaxValue(apartment.beds);
        if (bedField === "5") {
          return !(max_beds < 5) && apartment.beds !== "Studio";
        } else {
          return bedField >= min_beds && bedField <= max_beds;
        }
      });
    }

    if (!isNaN(bathField) && bathField !== "") {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        const min_baths = getMinValue(apartment.baths);
        const max_baths = getMaxValue(apartment.baths);
        if (bathField === "5") {
          return !(max_baths < 5);
        } else {
          return bathField >= min_baths && bathField <= max_baths;
        }
      });
    }

    if (!isNaN(minRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMaxValue(apartment.rent);

        return rent >= minRentField;
      });
    }

    if (!isNaN(maxRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMinValue(apartment.rent);

        return rent <= maxRentField;
      });
    }

    setFilteredApartments(newFilteredApartments);
  }, [
    apartments,
    sortBy,
    searchField,
    bedField,
    bathField,
    minRentField,
    maxRentField,
  ]);

  // On search handler for "Sort By" filter
  const sortByChangeHandler = (event) => {
    if (event !== null) {
      setSortBy(event.value);
      console.log(event.value);
    } else {
      setSortBy("");
    }
  };
  // On search handler for search field
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onBedChange = (event) => {
    if (event !== null) {
      setBedField(event.value);
      console.log(event.value);
    } else {
      setBedField("");
    }
  };
  const onBathChange = (event) => {
    if (event !== null) {
      setBathField(event.value);
      console.log(event.value);
    } else {
      setBathField("");
    }
  };
  const onMinRentChange = (event) => {
    const minRent = event.target.value;
    setMinRentField(parseFloat(minRent, 10));
    console.log(minRentField);
  };
  const onMaxRentChange = (event) => {
    const maxRent = event.target.value;
    setMaxRentField(parseFloat(maxRent, 10));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="ucla-listings"
            element={
              <Listings
                apartmentList={filteredApartments}
                sortByChangeHandler={sortByChangeHandler}
                searchFieldChangeHandler={onSearchChange}
                bedFieldChangeHandler={onBedChange}
                bathFieldChangeHandler={onBathChange}
                minRentChangeHandler={onMinRentChange}
                maxRentChangeHandler={onMaxRentChange}
                numListings={filteredApartments.length}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
