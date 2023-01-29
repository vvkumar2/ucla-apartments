import React from "react";
import "./maps-apartment-box.styles.css";

export default function MapsApartmentBox({ address, image_url, name, rent, sqft, id }) {
    // const { address, image_url, name, rent, sqft, id } = apartment;
    // remove city and zip code for address
    const abbreviatedAddress = address.indexOf("Los Angeles") > 10 ? address.substring(0, address.indexOf("Los Angeles")) : address;

    return (
        <div className="maps-apartment-box">
            <div className="maps-apartment-box-image-container">
                <img className="maps-apartment-box-image" src={image_url} alt="Apartment" />
                <h3 className="maps-apartment-box-header">{name}</h3>
            </div>
            <div className="maps-apartment-box-content">
                <div className="maps-apartment-box-top">
                    <span className="maps-apartment-box-address">{abbreviatedAddress}</span>
                    <div className="maps-apartment-box-features">
                        <span className="maps-apartment-box-feature">{rent}</span>
                        <div className="vertical-line-break" />
                        <span className="maps-apartment-box-feature">{sqft} sqft</span>
                    </div>
                </div>
                <div className="maps-apartment-box-buttons">
                    <a href={`/apartment-listing?id=${id}`}>
                        <button className="maps-apartment-box-button">View</button>
                    </a>
                </div>
            </div>
        </div>
    );
}
