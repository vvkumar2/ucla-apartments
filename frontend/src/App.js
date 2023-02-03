import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listings from './pages/listings/listings';
import Home from "./pages/homepage/homepage";
import Login from "./pages/login/login";
import ResetPassword from "./pages/reset-password/reset-password";
import Profile from "./pages/profile/profile";
import ResetEmail from "./pages/reset-email/reset-email";
import LikesPage from "./pages/liked-items/liked-items.component";
import DetailedListingPage from "./pages/detailed-listing-page/detailed-listing-page";
import { createClient } from '@supabase/supabase-js'
import useUserContext from "./context/user.context";
import './App.css';

// Creating a supabase client to connect to the database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to get the minimum value of the range for beds, baths, and sqft
function getMinValue(inputString) {
  if (inputString.includes("$")) {
    inputString = inputString.replaceAll('$', '')
  }
  if (inputString.includes("-")) {
    inputString = inputString.substr(0, inputString.indexOf("-")-1)
  }
  if (inputString.includes(",")) {
    inputString = inputString.replaceAll(',', '')
  }
  if (inputString==="Call for Rent" || inputString==="") {
    inputString = "100000"
  }
  
  return parseFloat(inputString, 10)
}

// Function to get the maximum value of the range for beds, baths, and sqft
function getMaxValue(inputString) {
  if (inputString.includes("$")) {
    inputString = inputString.replaceAll('$', '')
  }
  if (inputString.includes("-")) {
    inputString = inputString.substr(inputString.indexOf("-")+1, inputString.length)
  }
  if (inputString.includes(",")) {
    inputString = inputString.replaceAll(',', '')
  }
  if (inputString==="Call for Rent" || inputString==="") {
    inputString = "0"
  }

  return parseFloat(inputString, 10)
}

function App() {
  
  // Retrieve the user context
  const {login, logout, loggedIn} = useUserContext();

  // Initialize the user based on the stored session
  const initUser = useCallback(async () => {
    const {data: { session },} = await supabase.auth.getSession()
    if (session) {
      await login(session.user.email, session.user.user_metadata.first_name, session.user.user_metadata.last_name)
      console.log("Session exists")
      console.log(session)
    }
    else {
      logout();
      console.log("No session")
    }
  }, [login]);
  
  useEffect(() => {
    initUser();
  }, [initUser]);
    

  // Create states for sort by field
  const [sortBy, setSortBy] = useState("");

  // Create states for search fields
  const [searchField, setSearchField] = useState("");
  const [bedField, setBedField] = useState(NaN);
  const [bathField, setBathField] = useState(NaN);
  const [minRentField, setMinRentField] = useState(NaN);
  const [maxRentField, setMaxRentField] = useState(NaN);

  // States for apartment lists
  const [apartments, setApartments] = useState([])
  
  // Get apartment data from database and set it to the apartments state
  useEffect(() => {
    async function getListingData() {
      await supabase
        .from('apartment_data')
        .select('*')
        .then((json_data) => {setApartments(json_data.data)})
    }
    getListingData()
  }, [])
  const [filteredApartments, setFilteredApartments] = useState(apartments);

  // Filter apartments based on search field
  useEffect(() => {
    var newFilteredApartments = apartments.filter((apartment) => {
      return apartment.name.toLocaleLowerCase().includes(searchField);
    });

    if (sortBy !== "") {
      if (sortBy==="price_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinValue(a["rent"]) - getMinValue(b["rent"])
        }
        );
      }
      if (sortBy==="sqft_asc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinValue(a["sqft"]) - getMinValue(b["sqft"])
        }
        );
      }
      if (sortBy==="price_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxValue(b["rent"]) - getMaxValue(a["rent"])
        }
        );
      }
      if (sortBy==="sqft_desc") {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxValue(b["sqft"]) - getMaxValue(a["sqft"])
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

    // Filter apartments based on bed field
    if (!isNaN(bedField) && bedField!=="") {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        const min_beds = getMinValue(apartment.beds)
        const max_beds = getMaxValue(apartment.beds)
        if (bedField==="5") {
          return !(max_beds < 5) && apartment.beds!=="Studio"
        }
        else {
          return bedField >= min_beds && bedField <= max_beds
        }
      });
    }

    // Filter apartments based on bath field
    if (!isNaN(bathField) && bathField!=="") {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        const min_baths = getMinValue(apartment.baths)
        const max_baths = getMaxValue(apartment.baths)
        if (bathField==="5") {
          return !(max_baths < 5)
        }
        else {
          return bathField >= min_baths && bathField <= max_baths
        }
      });
    }

    // Filter apartments based on min rent field
    if (!isNaN(minRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMaxValue(apartment.rent);

        return rent >= minRentField;
      });
    }

    // Filter apartments based on max rent field
    if (!isNaN(maxRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMinValue(apartment.rent);

        return rent <= maxRentField;
      });
    }

    setFilteredApartments(newFilteredApartments);
  }, [apartments, sortBy, searchField, bedField, bathField, minRentField, maxRentField]);

  // On search handler for "Sort By" filter
  const sortByChangeHandler = (event) => {
    if (event !== null) {
      setSortBy(event.value)
    }
    else {
      setSortBy("") 
    }
  }

  // Search field handlers for each filter
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onBedChange = (event) => {
    if (event !== null) {
      setBedField(event.value)
    }
    else {
      setBedField("") 
    }
  };
  const onBathChange = (event) => {
    if (event !== null) {
      setBathField(event.value)
    }
    else {
      setBathField("") 
    }
  };
  const onMinRentChange = (event) => {
    const minRent = event.target.value;
    setMinRentField(parseFloat(minRent, 10));
  };
  const onMaxRentChange = (event) => {
    const maxRent = event.target.value;
    setMaxRentField(parseFloat(maxRent, 10));
  };

  // Reset filters
  const resetFilters = () => {
    setSortBy("")
    setSearchField("")
    setBedField(NaN)
    setBathField(NaN)
    setMinRentField(NaN)
    setMaxRentField(NaN)
  }


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
              numListings={filteredApartments.length}
              ResetFilters={resetFilters}/>} />
          <Route path="liked-items" element={<LikesPage />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="reset-email" element={<ResetEmail />} />
          <Route path="apartment-listing" element={<DetailedListingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
