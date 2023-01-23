import React from "react";
import { Link } from "react-router-dom";

import "./saved-apartment-box.styles.css";

export default function SavedApartmentBox({ name, address, image_url, supabase_id }) {
    console.log("Supabase ID", supabase_id);
    // remove city and zip code for address
    const abbreviatedAddress = address.indexOf("Los Angeles") > 10 ? address.substring(0, address.indexOf("Los Angeles")) : address;

    return (
        <div className="saved-apartment-box">
            <img className="saved-apartment-box-image" src={image_url} alt="Apartment" />
            <div className="saved-apartment-box-content">
                <div className="saved-apartment-box-top">
                    <h3 className="saved-apartment-box-header">{name}</h3>
                    <span className="saved-apartment-box-address">{abbreviatedAddress}</span>
                </div>
                <div className="saved-apartment-box-buttons">
                    <Link to={`/apartment-listing?id=${supabase_id}`}>
                        <button className="saved-apartment-box-button">View</button>
                    </Link>
                    <button className="saved-apartment-box-button">Move</button>
                </div>
            </div>
        </div>
    );
}
