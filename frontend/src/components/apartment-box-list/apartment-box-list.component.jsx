import React from "react";
import ApartmentBox from "../apartment-box/apartment-box.component";

import './apartment-box-list.styles.css'

const ApartmentBoxList = (props) => {
  return (
    <div className="apartment-box-list-container">
        <ApartmentBox 
            image="https://images1.apartments.com/i2/Wg9_HNk-Sm-8SGATHOaX2ZCheNkF1LdoFm8BOY4o3mk/111/image.jpg"
            name="The Colby Apartments"
            address="1515 Colby Ave, Los Angeles, CA 90025"
            url="colbyapartments.com"
            beds="5"
            baths="3"
            sqft="500"
            monthly_rent="3000"
            distance="0.2"
        />
        <ApartmentBox 
            image="https://images1.apartments.com/i2/Wg9_HNk-Sm-8SGATHOaX2ZCheNkF1LdoFm8BOY4o3mk/111/image.jpg"
            name="The Colby Apartments"
            address="1515 Colby Ave, Los Angeles, CA 90025"
            url="colbyapartments.com"
            beds="5"
            baths="3"
            sqft="500"
            monthly_rent="3000"
            distance="0.2"
        />
        <ApartmentBox 
            image="https://images1.apartments.com/i2/Wg9_HNk-Sm-8SGATHOaX2ZCheNkF1LdoFm8BOY4o3mk/111/image.jpg"
            name="The Colby Apartments"
            address="1515 Colby Ave, Los Angeles, CA 90025"
            url="colbyapartments.com"
            beds="5"
            baths="3"
            sqft="500"
            monthly_rent="3000"
            distance="0.2"
        />
    </div>
  );
};

export default ApartmentBoxList;
