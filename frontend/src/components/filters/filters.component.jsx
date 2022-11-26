import React from "react";
import './filters.styles.css'

const Filters = ({searchFieldChangeHandler}) => {
  return (
    <div className="filter-container">
        <div className="filter-container-top">
            <input
                className="search-box"
                type="search"
                placeholder="Search for any keyword"
                onChange={searchFieldChangeHandler}
            />
            <div className="bed-bath-filter">
                <input
                    className="bed-bath-search-box"
                    type="search"
                    placeholder="Beds"
                    // onChange={onChangeHandler}
                />
                <input
                    className="bed-bath-search-box"
                    type="search"
                    placeholder="Baths"
                    // onChange={onChangeHandler}
                />
            </div>
            <div className="rent-filter">
                <p className="extra">$</p>
                <input
                    className="rent-search-box"
                    type="search"
                    placeholder="Min Rent"
                    // onChange={onChangeHandler}
                />
                <p className="dash">-</p>
                <p className="extra">$</p>
                <input
                    className="rent-search-box"
                    type="search"
                    placeholder="Max Rent"
                    // onChange={onChangeHandler}
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
