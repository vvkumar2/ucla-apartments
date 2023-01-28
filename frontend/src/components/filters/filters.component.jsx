import React, { useState } from "react";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons'
import './filters.styles.css'

const Filters = ({ResetFilters, searchFieldChangeHandler, sortByChangeHandler, bedFieldChangeHandler, bathFieldChangeHandler, minRentChangeHandler, maxRentChangeHandler}) => {
    const [bedValue, setBedValue] = useState("")
    const [bathValue, setBathValue] = useState("")
    const [sortByValue, setSortByValue] = useState("")

    const sort_by_options = [
        { value: 'distance', label: "Distance to UCLA"},
        { value: 'price_asc', label: "Price Ascending"},
        { value: 'price_desc', label: "Price Descending"},
        { value: 'sqft_asc', label: "Sqft: Ascending"},
        { value: 'sqft_desc', label: "Sqft: Descending"},
    ]
    
    const bed_bath_options = [
        { value: '1', label: '1'},
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5+' },
    ]

    function ResetFilterFields () {
        ResetFilters()
        document.getElementById("search-box").value = ""
        document.getElementById("min-rent").value = ""
        document.getElementById("max-rent").value = ""
        setBedValue("")
        setBathValue("")
        setSortByValue("")
    }

    function bedFieldChangeHandlerTotal (event) {
        setBedValue(event)
        bedFieldChangeHandler(event)
    }

    function bathFieldChangeHandlerTotal (event) {
        setBathValue(event)
        bathFieldChangeHandler(event)
    }

    function sortByChangeHandlerTotal (event) {
        setSortByValue(event)
        sortByChangeHandler(event)
    }
    
    // rendering all the filters for the user to interact with
    return (
    <div className="filter-container">
        <div className="filter-container-top">
            <div className="search-sort-by-container">
                <input
                className="search-box"
                type="search"
                placeholder="Search for any keyword"
                onChange={searchFieldChangeHandler}
                id="search-box"
                />
                <Select 
                    className="sort-by-dropdown" 
                    isClearable
                    placeholder="Sort By" 
                    options={sort_by_options} 
                    onChange={sortByChangeHandlerTotal}
                    value={sortByValue}
                    styles={{
                    control: base => ({
                        ...base,
                        border: 0,
                        boxShadow: 'none'
                    }) }}
                />

            </div>
            <div className="bed-bath-filter">
                <Select 
                    className="bed-bath-search-box"
                    id="bed-bath-search-box" 
                    isClearable
                    placeholder={<FontAwesomeIcon icon={faBed} />} 
                    options={bed_bath_options} 
                    onChange={bedFieldChangeHandlerTotal}
                    value={bedValue}
                    styles={{
                    control: base => ({
                        ...base,
                        border: 0,
                        boxShadow: 'none'
                    }) }}
                />
                <Select 
                    className="bed-bath-search-box" 
                    isClearable
                    placeholder={<FontAwesomeIcon icon={faBath} />} 
                    options={bed_bath_options} 
                    onChange={bathFieldChangeHandlerTotal}
                    value={bathValue}
                    styles={{
                    control: base => ({
                        ...base,
                        border: 0,
                        boxShadow: 'none'
                    }) }}
                />
            </div>
            <div className="rent-filter">
                <p className="extra">$</p>
                <input
                    className="rent-search-box"
                    type="search"
                    placeholder="Min Rent"
                    id="min-rent"
                    onChange={minRentChangeHandler}
                />
                <p className="dash">-</p>
                <p className="extra">$</p>
                <input
                    className="rent-search-box"
                    type="search"
                    placeholder="Max Rent"
                    id="max-rent"
                    onChange={maxRentChangeHandler}
                />
            </div>
        </div>
        <div className="filter-container-bottom">
            {/* reset filter button */}
            <div className="reset-filter-button" onClick={ResetFilterFields}>Reset Filters</div>
        </div>
    </div>
  );
};

export default Filters;
