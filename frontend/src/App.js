import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from './pages/listings/listings';
import Home from "./pages/homepage/homepage";
import './App.css';
import apartment_data from "./data/apartment_data.json";

function getMinRent(rentString) {
  if (rentString.includes("$")) {
    rentString = rentString.replaceAll('$', '')
  }
  if (rentString.includes("-")) {
    rentString = rentString.substr(0, rentString.indexOf("-")-1)
  }
  if (rentString.includes(",")) {
    rentString = rentString.replaceAll(',', '')
  }
  if (rentString==="Call for Rent") {
    rentString = "0"
  }

  return parseFloat(rentString, 10)
}

function getMaxRent(rentString) {
  if (rentString.includes("$")) {
    rentString = rentString.replaceAll('$', '')
  }
  if (rentString.includes("-")) {
    rentString = rentString.substr(rentString.indexOf("-")+1, rentString.length)
  }
  if (rentString.includes(",")) {
    rentString = rentString.replaceAll(',', '')
  }
  if (rentString==="Call for Rent") return 10000

  return parseFloat(rentString, 10)
}

function getMinSqft(sqftString) {
  if (sqftString.includes("-")) {
    sqftString = sqftString.substr(0, sqftString.indexOf("-")-1)
  }
  if (sqftString.includes(",")) {
    sqftString = sqftString.replaceAll(',', '')
  }
  if (sqftString==="") {
    sqftString = "0"
  }

  return parseFloat(sqftString, 10)
}

function getMaxSqft(sqftString) {
  if (sqftString.includes("-")) {
    sqftString = sqftString.substr(sqftString.indexOf("-")+1, sqftString.length)
  }
  if (sqftString.includes(",")) {
    sqftString = sqftString.replaceAll(',', '')
  }
  if (sqftString==="") {
    sqftString = "0"
  }

  return parseFloat(sqftString, 10)
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
      if (sortBy==="price_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinRent(a["rent"]) - getMinRent(b["rent"])
        }
        );
      }
      if (sortBy==="sqft_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinSqft(a["sqft"]) - getMinSqft(b["sqft"])
        }
        );
      }
      if (sortBy==="price_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxRent(b["rent"]) - getMaxRent(a["rent"])
        }
        );
      }
      if (sortBy==="sqft_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          console.log(b["sqft"])
          return getMaxSqft(b["sqft"]) - getMaxSqft(a["sqft"])
        }
        );
      }
      if (sortBy==="distance") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          let dista = a["distance"]
          let distb = b["distance"]
          return dista - distb
        }
        );
      }
    }

    if (!isNaN(bedField) && bedField!=="") {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.beds.includes(bedField)
      });
    }

    if (!isNaN(bathField) && bathField!=="") {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        return apartment.baths.includes(bathField) && !apartment.baths.includes("." + bathField)
      });
    }

    if (!isNaN(minRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMaxRent(apartment.rent);

        return rent >= minRentField;
      });
    }

    if (!isNaN(maxRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMinRent(apartment.rent);

        return rent <= maxRentField;
      });
    }


    setFilteredApartments(newFilteredApartments);
  }, [apartments, sortBy, searchField, bedField, bathField, minRentField, maxRentField]);

  // On search handler for "Sort By" filter
  const sortByChangeHandler = (event) => {
    if (event !== null) {
      setSortBy(event.value)
      console.log(event.value);
    }
    else {
      setSortBy("") 
    }
  }
  // On search handler for search field
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onBedChange = (event) => {
    if (event !== null) {
      setBedField(event.value)
      console.log(event.value);
    }
    else {
      setBedField("") 
    }
  };
  const onBathChange = (event) => {
    if (event !== null) {
      setBathField(event.value)
      console.log(event.value);
    }
    else {
      setBathField("") 
    }
  };
  const onMinRentChange = (event) => {
    const minRent = event.target.value;
    setMinRentField(parseFloat(minRent, 10));
    console.log(minRentField)
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
