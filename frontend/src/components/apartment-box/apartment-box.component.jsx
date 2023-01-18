import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faPersonWalking } from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as HeartIcon} from "../../assets/heart-icon.svg"
import { createClient } from '@supabase/supabase-js'
import useUserContext from "../../context/user.context";
import './apartment-box.styles.css'

// const id = "e59598f1-0607-4446-a2ed-4f31d802948d";
const ApartmentBox = ({image, name, address, url, beds, baths, sqft, rent, image_list, about_text, office_hours, seller_logo, community_amenities, utilities, apartment_highlights, floor_plan_features, kitchen_features, property_services, unique_features, distance, liked, addToLiked, website_url, phone_number, phone_number_href}) => {
    let navigate = useNavigate()

    function learnMoreHandler () {
        navigate("/apartment-listing", {state: { image_list: image_list, name: name, address: address, seller_logo: seller_logo, unique_features: unique_features, community_amenities: community_amenities, apartment_highlights: apartment_highlights, kitchen_features: kitchen_features, floor_plan_features: floor_plan_features, utilities: utilities, phone_number: phone_number, phone_number_href: phone_number_href, website_url: website_url, property_services: property_services, about_text:about_text, beds: beds, baths: baths, sqft: sqft, rent: rent, distance: distance, office_hours: office_hours }});
    }

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
                        <p><FontAwesomeIcon icon={faBed} /> &emsp;{beds} &emsp;&emsp;&emsp;&emsp; <FontAwesomeIcon icon={faBath} /> &emsp;{baths} &emsp;&emsp;&emsp;&emsp;  {sqft} Sqft </p>
                    </div>
                </div>
                <div className="apartment-box-top-right">
                    <button className="apartment-box-interested" onClick={learnMoreHandler}>Learn More</button>
                    <HeartIcon className={liked ? "like-button-icon clicked" : "like-button-icon not-clicked"} 
                        onClick={() => addToLiked(beds, name, rent, sqft, baths, image, address, distance)} />
                </div>
                {/* Add a like button */}
            </div>
            <div className="apartment-box-bottom">
                <div className="apartment-box-bottom-left">
                    <h1 className="apartment-rent">Monthly Rent: {rent}</h1>
                </div>
                <div className="apartment-box-bottom-right">
                    <p className="apartment-utilities">UCLA <FontAwesomeIcon icon={faPersonWalking} /> : {distance} mi</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ApartmentBox;
