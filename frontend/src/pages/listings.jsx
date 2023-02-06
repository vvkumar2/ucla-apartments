import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import ApartmentBoxList from "../components/apartment-box-list/apartment-box-list.component";
import Filters from "../components/filters/filters.component";
import Navbar from "../components/navbar";
import SectionHeader from "../components/section-header/section-header.component";
import CustomMap from "../components/google-maps/google-maps.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faList } from "@fortawesome/free-solid-svg-icons";

// Function to get the minimum value of the range for beds, baths, and sqft
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

// Function to get the maximum value of the range for beds, baths, and sqft
function getMaxValue(inputString) {
    if (inputString.includes("$")) {
        inputString = inputString.replaceAll("$", "");
    }
    if (inputString.includes("-")) {
        inputString = inputString.substr(inputString.indexOf("-") + 1, inputString.length);
    }
    if (inputString.includes(",")) {
        inputString = inputString.replaceAll(",", "");
    }
    if (inputString === "Call for Rent" || inputString === "") {
        inputString = "0";
    }

    return parseFloat(inputString, 10);
}

// This is the Listings page component that renders all the apartments for selected school and allows user to filter them by different parameters such as price, number of bedrooms, etc.
const Listings = () => {
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [mapView, setMapView] = useState(false);

    // search/sort/filter states
    const [sortBy, setSortBy] = useState("");
    const [searchField, setSearchField] = useState("");
    const [bedField, setBedField] = useState(NaN);
    const [bathField, setBathField] = useState(NaN);
    const [minRentField, setMinRentField] = useState(NaN);
    const [maxRentField, setMaxRentField] = useState(NaN);

    useEffect(() => {
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        async function getListingData() {
            await supabase
                .from("apartment_data")
                .select("*")
                .then((json_data) => {
                    setApartments(json_data.data);
                });
        }
        getListingData();
    }, []);

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

        // Filter apartments based on bed field
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

        // Filter apartments based on bath field
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
    }, [apartments, sortBy, searchField, bedField, bathField, minRentField, maxRentField, setFilteredApartments]);

    // Search field handlers for each filter
    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString);
    };
    const onBedChange = (event) => {
        if (event !== null) {
            setBedField(event.value);
        } else {
            setBedField("");
        }
    };
    const onBathChange = (event) => {
        if (event !== null) {
            setBathField(event.value);
        } else {
            setBathField("");
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

    // On search handler for "Sort By" filter
    const sortByChangeHandler = (newSortByValue) => {
        console.log(newSortByValue);
        setSortBy(newSortByValue);
    };

    // Reset filters
    const resetFilters = () => {
        setSortBy("");
        setSearchField("");
        setBedField(NaN);
        setBathField(NaN);
        setMinRentField(NaN);
        setMaxRentField(NaN);
    };

    const listingsPerPage = 10;
    let pageLimit = 5;
    let maxPages = Math.ceil(filteredApartments.length / listingsPerPage);

    return (
        <div>
            <Navbar showBackground={mapView} />
            <div className="switch-view">
                <button
                    className="fixed right-32 bottom-12 z-10 shadow-standard rounded-md flex items-center justify-center gap-3 px-3 py-2 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer font-bold"
                    onClick={() => setMapView(!mapView)}
                >
                    {mapView ? <FontAwesomeIcon icon={faList} /> : <FontAwesomeIcon icon={faMap} />}
                    {mapView ? "List View" : "Map View"}
                </button>
            </div>
            {!mapView && (
                <div className="flex flex-col gap-5 mx-32 mt-32">
                    <h1 className="text-4xl font-bold">Apartments Near UCLA</h1>
                    <Filters
                        searchFieldChangeHandler={onSearchChange}
                        sortByChangeHandler={sortByChangeHandler}
                        bedFieldChangeHandler={onBedChange}
                        bathFieldChangeHandler={onBathChange}
                        minRentChangeHandler={onMinRentChange}
                        maxRentChangeHandler={onMaxRentChange}
                        ResetFilters={resetFilters}
                    />
                    <ApartmentBoxList
                        apartmentList={filteredApartments}
                        dataLimit={listingsPerPage}
                        pageLimit={maxPages < pageLimit ? maxPages : pageLimit}
                        maxPagesInput={maxPages}
                    />
                </div>
            )}
            {mapView && (
                <div className="map-section">
                    <CustomMap apartmentList={filteredApartments} />
                </div>
            )}
        </div>
    );
};

export default Listings;
