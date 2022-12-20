import React, { useState, useEffect } from "react";

import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import Filters from "../../components/filters/filters.component";
import Navbar from "../navbar/navbar";
import SectionHeader from "../../components/section-header/section-header.component";

import apartment_data from "../../data/apartment_data.json";

import "./listings.styles.css";

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

const Listings = () => {
  const listingsPerPage = 10;
  let pageLimit = 5;
  let maxPages = Math.ceil(apartment_data.length / listingsPerPage);

  const [sortBy, setSortBy] = useState("");

  const [searchField, setSearchField] = useState("");
  const [bedField, setBedField] = useState(NaN);
  const [bathField, setBathField] = useState(NaN);
  const [minRentField, setMinRentField] = useState(NaN);
  const [maxRentField, setMaxRentField] = useState(NaN);

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

    // allow flexible input formats
    minRent.replaceAll("$", "");
    minRent.replaceAll(",", "");
    minRent.replaceAll(" ", "");

    setMinRentField(parseFloat(minRent, 10));
  };
  const onMaxRentChange = (event) => {
    const maxRent = event.target.value;

    // allow flexible input formats
    maxRent.replaceAll("$", "");
    maxRent.replaceAll(",", "");
    maxRent.replaceAll(" ", "");

    setMaxRentField(parseFloat(maxRent, 10));
  };

  return (
    <div className="listings-section" id="listings-section-id">
      <SectionHeader header_name="Apartments near UCLA" />
      <Filters
        searchFieldChangeHandler={onSearchChange}
        sortByChangeHandler={sortByChangeHandler}
        bedFieldChangeHandler={onBedChange}
        bathFieldChangeHandler={onBathChange}
        minRentChangeHandler={onMinRentChange}
        maxRentChangeHandler={onMaxRentChange}
      />
      <ApartmentBoxList
        apartmentList={filteredApartments}
        dataLimit={listingsPerPage}
        pageLimit={maxPages < pageLimit ? maxPages : pageLimit}
        maxPagesInput={maxPages}
      />
    </div>
  );
};

export default Listings;
