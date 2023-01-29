import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HeartIcon } from "../../assets/heart-icon.svg";
import useUserContext from "../../context/user.context";
import { checkIfItemInSupabaseCategory, addItemToSupabaseCategory } from "../../utils/supabase-utils";

import "./apartment-box.styles.css";

const ApartmentBox = ({ apartment }) => {
    const { email } = useUserContext();
    const [liked, setLiked] = useState(false);

    const { id, name, address, image_url, beds, baths, sqft, rent, distance } = apartment;

    async function addToLiked() {
        const response = await addItemToSupabaseCategory(email, "LIKED", apartment);
        setLiked(response ? true : false);
    }

    useEffect(() => {
        async function checkIfLiked() {
            const response = await checkIfItemInSupabaseCategory(email, apartment, "LIKED");
            setLiked(response ? true : false);
        }
        checkIfLiked();
    }, [email, apartment]);

    return (
        <div className="apartment-box">
            <img className="apartment-box-image" src={image_url} alt="" />
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
                            onClick={() => addToLiked(apartment)}
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
