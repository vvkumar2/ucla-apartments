import React from "react";
import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import Filters from "../../components/filters/filters.component";
import Navbar from "../navbar/navbar";
import SectionHeader from "../../components/section-header/section-header.component";

import './listings.styles.css'

const Listings = () => {
  return (
    <div className="listings-section" id="listings-section-id">
        <Navbar />
        <SectionHeader header_name="Apartments near UCLA" />
        <Filters />
        <ApartmentBoxList />
    </div>
  );
};

export default Listings;
