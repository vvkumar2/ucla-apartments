import React from "react";
import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import Filters from "../../components/filters/filters.component";
import Navbar from "../navbar/navbar";
import SectionHeader from "../../components/section-header/section-header.component";

import './listings.styles.css'

const Listings = ({apartmentList, searchFieldChangeHandler, bedFieldChangeHandler, bathFieldChangeHandler, minRentChangeHandler, maxRentChangeHandler}) => {
  const listingsPerPage = 10
  let pageLimit = 5
  let maxPages = Math.ceil(apartmentList.length/listingsPerPage)

  return (
    <div className="listings-section" id="listings-section-id">
        <Navbar />
        <SectionHeader header_name="Apartments near UCLA" />
        <Filters searchFieldChangeHandler={searchFieldChangeHandler}
          bedFieldChangeHandler={bedFieldChangeHandler}
          bathFieldChangeHandler={bathFieldChangeHandler}
          minRentChangeHandler={minRentChangeHandler}
          maxRentChangeHandler={maxRentChangeHandler}/>
        <ApartmentBoxList apartmentList={apartmentList} dataLimit={listingsPerPage} pageLimit={maxPages<pageLimit ? maxPages : pageLimit } maxPagesInput={maxPages}/>
    </div>
  );
};

export default Listings;
