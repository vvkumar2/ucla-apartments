import React from "react";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faBathtub } from '@fortawesome/free-solid-svg-icons'
import './filters.styles.css'

const Filters = ({searchFieldChangeHandler, sortByChangeHandler, bedFieldChangeHandler, bathFieldChangeHandler, minRentChangeHandler, maxRentChangeHandler}) => {
    const sort_by_options = [
        { value: 'distance', label: "Distance to UCLA"},
        { value: 'price_asc', label: "Price Descending"},
        { value: 'price_desc', label: "Price Ascending"},
        { value: 'sqft_asc', label: "Sqft: Descending"},
        { value: 'sqft_desc', label: "Sqft: Ascending"},
    ]
    
    const bed_bath_options = [
        { value: '1', label: '1'},
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]
    
    return (
    <div className="filter-container">
        <div className="filter-container-top">
            <div className="search-sort-by-container">
                <input
                className="search-box"
                type="search"
                placeholder="Search for any keyword"
                onChange={searchFieldChangeHandler}
                />
                <Select 
                    className="sort-by-dropdown" 
                    isClearable
                    placeholder="Sort By" 
                    options={sort_by_options} 
                    onChange={sortByChangeHandler}
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
                    isClearable
                    placeholder={<FontAwesomeIcon icon={faBed} />} 
                    options={bed_bath_options} 
                    onChange={bedFieldChangeHandler}
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
                    onChange={bathFieldChangeHandler}
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
                    onChange={minRentChangeHandler}
                />
                <p className="dash">-</p>
                <p className="extra">$</p>
                <input
                    className="rent-search-box"
                    type="search"
                    placeholder="Max Rent"
                    onChange={maxRentChangeHandler}
                />
            </div>
            

            

        </div>
        {/* <div>
            Add "Sort By" filter
        </div> */}
    </div>
  );
};

export default Filters;
