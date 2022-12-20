import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HeartIcon } from "../../assets/heart-icon.svg";
import "./apartment-box.styles.css";

const ApartmentBox = ({
  image,
  name,
  address,
  url,
  beds,
  baths,
  sqft,
  rent,
  distance,
}) => {
  const [btnClass, setBtnClass] = useState(false);

  function addToLiked() {
    btnClass ? setBtnClass(false) : setBtnClass(true);
  }

  return (
    <div className="apartment-box">
      <img className="apartment-box-image" src={image} alt="" />
      <div className="apartment-box-description">
        <div className="apartment-box-top">
          <div className="apartment-box-top-left">
            <h1 className="apartment-name">{name}</h1>
            <div className="apartment-description">
              <p className="apartment-address">{address}</p>
              {/* <p className="apartment-url"><a href={url}>{url}</a></p> */}
              <div className="apartment-details">
                <p>
                  <FontAwesomeIcon icon={faBed} /> {beds}
                </p>
                <p>
                  <FontAwesomeIcon icon={faBath} /> {baths}
                </p>
                <p>{sqft} Sqft </p>
              </div>
            </div>
          </div>
          <div className="apartment-box-top-right">
            <button className="apartment-box-interested">Learn More</button>
            <HeartIcon
              className={
                btnClass
                  ? "like-button-icon clicked"
                  : "like-button-icon not-clicked"
              }
              onClick={() => {
                addToLiked();
              }}
            />
          </div>
          {/* Add a like button */}
        </div>
        <div className="apartment-box-bottom">
          <div className="apartment-box-bottom-left">
            <h1 className="apartment-rent">Monthly Rent: {rent}</h1>
          </div>
          <div className="apartment-box-bottom-right">
            <p className="apartment-utilities">
              <FontAwesomeIcon icon={faPersonWalking} /> : &nbsp;&nbsp;
              {distance} mi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentBox;
