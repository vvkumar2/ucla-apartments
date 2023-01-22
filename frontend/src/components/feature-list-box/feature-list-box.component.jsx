import React from "react";
import './feature-list-box.styles.css'

const FeatureListBox = ({ section_header, features_list }) => {
  return (
    <div className="features-container">
        <h1 className="features-section-header">{section_header}</h1>
        <ul className="features-text">
            { features_list.map((feature, index) => {
                return (
                    <li key={index}>{feature}</li>
                )
            })}
        </ul>
    </div>  
  );
};

export default FeatureListBox;