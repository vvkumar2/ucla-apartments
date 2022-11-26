import React from "react";
import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import Filters from "../../components/filters/filters.component";
import Navbar from "../navbar/navbar";
import SectionHeader from "../../components/section-header/section-header.component";

import './listings.styles.css'

const Listings = ({apartment_list, searchFieldChangeHandler}) => {
  return (
    <div className="listings-section" id="listings-section-id">
        <Navbar />
        <SectionHeader header_name="Apartments near UCLA" />
        <Filters searchFieldChangeHandler={searchFieldChangeHandler}/>
        <ApartmentBoxList apartment_list={apartment_list}/>
    </div>
  );
};

export default Listings;
