import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HeartIcon } from "../../assets/heart-icon.svg";
import "./apartment-box.styles.css";

const ApartmentBox = ({
    id,
    name,
    address,
    image,
    beds,
    baths,
    sqft,
    rent,
    distance,
    liked,
    image_list,
    about_text,
    office_hours,
    seller_logo,
    community_amenities,
    utilities,
    apartment_highlights,
    floor_plan_features,
    kitchen_features,
    property_services,
    unique_features,
    website_url,
    phone_number,
    phone_number_href,
    addToLiked,
}) => {
    return (
        <div className="apartment-box">
            {/* Image */}
            <img className="apartment-box-image" src={image} alt="" />
            {/* Apartment Description */}
            <div className="apartment-box-description">
                <div className="apartment-box-top">
                    <div className="apartment-box-top-left">
                        <h1 className="apartment-name">{name}</h1>
                        <div className="apartment-description">
                            <p className="apartment-address">{address}</p>
                            <p>
                                <FontAwesomeIcon icon={faBed} /> &emsp;{beds} &emsp;&emsp;&emsp;&emsp; <FontAwesomeIcon icon={faBath} /> &emsp;{baths}{" "}
                                &emsp;&emsp;&emsp;&emsp; {sqft} Sqft{" "}
                            </p>
                        </div>
                    </div>
                    <div className="apartment-box-top-right">
                        <button className="apartment-box-interested">
                            <Link to={"/apartment-listing?id=" + String(id)}>Learn More</Link>
                        </button>
                        <HeartIcon
                            className={liked ? "like-button-icon clicked" : "like-button-icon not-clicked"}
                            onClick={() => addToLiked(beds, name, rent, sqft, baths, image, address, distance, id)}
                        />
                    </div>
                </div>
                <div className="apartment-box-bottom">
                    <div className="apartment-box-bottom-left">
                        <h1 className="apartment-rent">Monthly Rent: {rent}</h1>
                    </div>
                    <div className="apartment-box-bottom-right">
                        <p className="apartment-utilities">
                            UCLA <FontAwesomeIcon icon={faPersonWalking} /> : {distance} mi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentBox;
