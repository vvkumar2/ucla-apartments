import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons'

import './apartment-box.styles.css'

const ApartmentBox = ({image, name, address, url, beds, baths, sqft, monthly_rent, distance}) => {
  return (
    <div className="apartment-box">
        <img className="apartment-box-image"
            src={image}
            alt=""
        />
        <div className="apartment-box-description">
            <div className="apartment-box-top">
                <div className="apartment-box-top-left">
                    <h1 className="apartment-name">{name}</h1>
                    <div className="apartment-description">
                        <p className="apartment-address">{address}</p>
                        {/* <p className="apartment-url"><a href={url}>{url}</a></p> */}
                        <p><FontAwesomeIcon icon={faBed} /> &emsp;{beds} &emsp;&emsp;&emsp;&emsp; <FontAwesomeIcon icon={faBath} /> &emsp;{baths} &emsp;&emsp;&emsp;&emsp;  {sqft} Sqft </p>
                    </div>
                </div>
                <button className="apartment-box-interested">I'm Interested</button>
                {/* Add a like button */}
            </div>
            <div className="apartment-box-bottom">
                <div className="apartment-box-bottom-left">
                    <h1 className="apartment-rent">Monthly Rent: ${monthly_rent}</h1>
                    <p className="apartment-utilities">Distance to UCLA: {distance} mi</p>
                </div>
                {/* <div className="apartment-box-bottom-right"> */}
                    {/* <p className="apartment-distance">{distance} mi</p> */}
                {/* </div> */}
            </div>
        </div>
    </div>
  );
};

export default ApartmentBox;
