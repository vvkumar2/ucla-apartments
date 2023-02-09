import React, { useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "./dropdown";
import FiltersDropdown from "./filters-dropdown";

const Filters = ({
    ResetFilters,
    searchFieldChangeHandler,
    sortByChangeHandler,
    bedFieldChangeHandler,
    bathFieldChangeHandler,
    minRentChangeHandler,
    maxRentChangeHandler,
}) => {
    const [bedValue, setBedValue] = useState("");
    const [bathValue, setBathValue] = useState("");
    const [sortByValue, setSortByValue] = useState("");
    const [sortByLabel, setSortByLabel] = useState("None");

    const sort_by_options = [
        { value: "", label: "None" },
        { value: "distance", label: "Distance to UCLA" },
        { value: "price_asc", label: "Price Ascending" },
        { value: "price_desc", label: "Price Descending" },
        { value: "sqft_asc", label: "Sqft: Ascending" },
        { value: "sqft_desc", label: "Sqft: Descending" },
    ];

    const bed_bath_options = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5+" },
    ];

    function ResetFilterFields() {
        ResetFilters();
        document.getElementById("search-box").value = "";
        document.getElementById("min-rent").value = "";
        document.getElementById("max-rent").value = "";
        setBedValue("");
        setBathValue("");
        setSortByValue("");
        setSortByLabel("None");
    }

    function bedFieldChangeHandlerTotal(event) {
        setBedValue(event);
        bedFieldChangeHandler(event);
    }

    function bathFieldChangeHandlerTotal(event) {
        setBathValue(event);
        bathFieldChangeHandler(event);
    }

    function sortByChangeHandlerTotal(newSortByValue, newSortByLabel) {
        setSortByValue(newSortByValue);
        setSortByLabel(newSortByLabel);
        sortByChangeHandler(newSortByValue);
    }

    // rendering all the filters for the user to interact with
    return (
        <div className="mt-[-100px] w-full mx-auto p-10 bg-white shadow-standard rounded-xl">
            <div className="flex justify-between h-12">
                <div className="flex items-center gap-2 w-[250px] rounded-md text-gray-500 px-4 text-sm bg-gray-50">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        className="border-none outline-none focus:outline-none focus:ring-0 w-full bg-gray-50 font-medium"
                        type="search"
                        placeholder="Search"
                        onChange={searchFieldChangeHandler}
                        id="search-box"
                    />
                </div>
                <FiltersDropdown />
                <Dropdown placeholder={"Sort By"} currentLabel={sortByLabel} options={sort_by_options} onChange={sortByChangeHandlerTotal} />
            </div>
            <div className="filter-container-bottom">
                <div className="reset-filter-button" onClick={ResetFilterFields}>
                    Reset Filters
                </div>
            </div>
        </div>
    );
};

export default Filters;
