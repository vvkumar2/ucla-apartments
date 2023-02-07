import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faWifi, faDumbbell, faTruckFast, faRug, faLightbulb, faKitchenSet } from '@fortawesome/free-solid-svg-icons'

const FeatureListBox = ({ section_header, features_list }) => {
    let icon = <FontAwesomeIcon icon={faFan} className="text-blue-500"/>
    switch(section_header) {
        case "Unique Features":
            icon = <FontAwesomeIcon icon={faFan} className="text-blue-500"/>
            break;
        case "Amenities":
            icon = <FontAwesomeIcon icon={faDumbbell} className="text-blue-500"/>
            break;
        case "Property Services":
            icon = <FontAwesomeIcon icon={faTruckFast} className="text-blue-500"/>
            break;
        case "Apartment Highlights":
            icon = <FontAwesomeIcon icon={faWifi} className="text-blue-500"/>
            break;
        case "Kitchen Features":
            icon = <FontAwesomeIcon icon={faKitchenSet} className="text-blue-500"/>
            break;
        case "Floor Plan Features":
            icon = <FontAwesomeIcon icon={faRug} className="text-blue-500"/>
            break;
        case "Utilities":
            icon = <FontAwesomeIcon icon={faLightbulb} className="text-blue-500"/>
            break;
    }

    return (
        <div className="flex flex-col gap-4 py-2">
            <div className="text-xl text-black-500 font-bold text-left backdrop-blur-xl bg-white/50 rounded-xl p-2 shadow-standard">{icon}&emsp;{section_header}</div>
            <div className="grid grid-cols-3 gap-4 text-left text-base text-slate-600">
                { features_list.map((feature, index) => {
                    return (
                        <div key={index}>{feature}</div>
                    )
                })}
            </div>
        </div>  
    );
};

export default FeatureListBox;