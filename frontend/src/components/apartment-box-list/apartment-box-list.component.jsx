import React from "react";
import ApartmentBox from "../apartment-box/apartment-box.component";

import './apartment-box-list.styles.css'

const ApartmentBoxList = ({apartment_list, numListings}) => {
  return (
    <div className="card-list">
      <p className="num-listings">Showing {numListings} Results</p>
      {apartment_list.map((apartment) => {
        console.log(apartment)
        return (
          <ApartmentBox 
            image="https://images1.apartments.com/i2/Wg9_HNk-Sm-8SGATHOaX2ZCheNkF1LdoFm8BOY4o3mk/111/image.jpg"
            name={apartment.name}
            address={apartment.address}
            url={apartment.url}
            beds={apartment.beds}
            baths={apartment.baths}
            sqft={apartment.sqft}
            monthly_rent={apartment.monthly_rent}
            distance={apartment.distance}
          />
        )})}
    </div>
  )}

export default ApartmentBoxList;
