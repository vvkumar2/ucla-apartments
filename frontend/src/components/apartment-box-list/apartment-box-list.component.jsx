import React from "react";
import ApartmentBox from "../apartment-box/apartment-box.component";

import './apartment-box-list.styles.css'

const ApartmentBoxList = ({apartment_list}) => {
  return (
    <div className="card-list">
        {apartment_list.map((apartment) => {
            return (
              <ApartmentBox 
                image="https://images1.apartments.com/i2/Wg9_HNk-Sm-8SGATHOaX2ZCheNkF1LdoFm8BOY4o3mk/111/image.jpg"
                name={apartment.name}
                address={apartment.address}
                url={apartment.url}
                beds={apartment.bed}
                baths={apartment.bath}
                monthly_rent={apartment.rent}
                distance="0.2"
              />
            )})}
    </div>
  )}

export default ApartmentBoxList;
