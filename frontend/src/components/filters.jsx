import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";

import FiltersDropdown from "./filters-dropdown";
import SearchBar from "./search-bar";
import SortByDropdown from "./sort-by-dropdown";

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
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        return window.addEventListener("resize", () => setScreenSize(window.innerWidth));
    }, []);

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
        <div className="mt-[-100px] w-full mx-auto p-10 bg-white shadow-standard rounded-xl flex flex-col gap-3">
            <div className="w-full flex justify-between">
                <span className="text-md text-gray-500">Sort & Filter</span>
                <span className="font-bold text-md text-blue-700 cursor-pointer hover:underline">Clear All</span>
            </div>
            {screenSize > 1300 ? (
                <div className="flex justify-between h-10">
                    <SearchBar searchFieldChangeHandler={searchFieldChangeHandler} />
                    <FiltersDropdown />
                    <SortByDropdown
                        placeholder={"Sort By"}
                        currentLabel={sortByLabel}
                        options={sort_by_options}
                        onChange={sortByChangeHandlerTotal}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <SearchBar searchFieldChangeHandler={searchFieldChangeHandler} />
                    <div className="flex flex-col gap-5 1000:flex-row w-full justify-between items-center">
                        <FiltersDropdown />
                        <SortByDropdown
                            placeholder={"Sort By"}
                            currentLabel={sortByLabel}
                            options={sort_by_options}
                            onChange={sortByChangeHandlerTotal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filters;
