import React from "react";
import './filters.styles.css'

const Filters = ({searchFieldChangeHandler, sortByChangeHandler, bedFieldChangeHandler, bathFieldChangeHandler, minRentChangeHandler, maxRentChangeHandler}) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    return (
    <div className="filter-container">
        <div className="filter-container-top">
            <div>
                <input
                className="search-box"
                type="search"
                placeholder="Search for any keyword"
                onChange={searchFieldChangeHandler}
                />
                <select className="sort-by-dropdown" onChange={sortByChangeHandler}>
                    <option value="">Sort By</option>
                    <option value="distance">Distance to UCLA</option>
                    <option value="price_asc">Price Ascending</option>
                    <option value="price_desc">Price Descending</option>
                    <option value="sqft_asc">Sqft Ascending</option>
                    <option value="sqft_desc">Sqft Descending</option>
                </select>
            </div>
            <div className="bed-bath-filter">
                <input
                    className="bed-bath-search-box"
                    type="search"
                    placeholder="Beds"
                    onChange={bedFieldChangeHandler}
                />
                <input
                    className="bed-bath-search-box"
                    type="search"
                    placeholder="Baths"
                    onChange={bathFieldChangeHandler}
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
