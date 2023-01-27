import React from "react";
import { Link } from "react-router-dom";
import useUserContext from "../../context/user.context";
import { addItemToSupabaseCategory } from "../../utils/supabase-utils";

import "./saved-apartment-box.styles.css";

export default function SavedApartmentBox({ apartment, category }) {
    const { address, image_url, name, rent, sqft, id } = apartment;
    const { email } = useUserContext();
    // remove city and zip code for address
    const abbreviatedAddress = address.indexOf("Los Angeles") > 10 ? address.substring(0, address.indexOf("Los Angeles")) : address;

    async function handleDropdownChange(e) {
        await addItemToSupabaseCategory(email, e.target.value, apartment, category);
        window.location.reload();
    }

    return (
        <div className="saved-apartment-box">
            <div className="saved-apartment-box-image-container">
                <img className="saved-apartment-box-image" src={image_url} alt="Apartment" />
                <h3 className="saved-apartment-box-header">{name}</h3>
            </div>
            <div className="saved-apartment-box-content">
                <div className="saved-apartment-box-top">
                    <span className="saved-apartment-box-address">{abbreviatedAddress}</span>
                    <div className="saved-apartment-box-features">
                        <span className="saved-apartment-box-feature">{rent}</span>
                        <div className="vertical-line-break" />
                        <span className="saved-apartment-box-feature">{sqft} sqft</span>
                    </div>
                </div>
                <div className="saved-apartment-box-buttons">
                    <Link to={`/apartment-listing?id=${id}`}>
                        <button className="saved-apartment-box-button">View</button>
                    </Link>
                    <select onChange={handleDropdownChange} name="cars" id="cars" className="saved-apartment-box-dropdown">
                        <option value="Move to" selected hidden disabled>
                            Move to
                        </option>
                        {category !== "SAVED_FOR_LATER" && <option value="SAVED_FOR_LATER">Saved for Later</option>}
                        {category !== "CONTACTING_OWNER" && <option value="CONTACTING_OWNER">Contacting Owner</option>}
                        {category !== "APPLICATIONS_IN_PROGRESS" && <option value="APPLICATIONS_IN_PROGRESS">Application in Progress</option>}
                        {category !== "COMPLETED" && <option value="COMPLETED">Completed</option>}
                    </select>
                </div>
            </div>
        </div>
    );
}
