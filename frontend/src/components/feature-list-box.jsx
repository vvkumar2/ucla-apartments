import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faWifi, faDumbbell, faTruckFast, faRug, faLightbulb, faKitchenSet, faChevronDown, faPlugCircleBolt } from '@fortawesome/free-solid-svg-icons'

const FeatureListBox = ({ section_header, features_list }) => {
    const [show, setShow] = React.useState(false);

    let icon = null;
    switch(section_header) {
        case "Unique Features":
            icon = <FontAwesomeIcon icon={faPlugCircleBolt} className="text-3xl text-blue-500"/>
            break;
        case "Amenities":
            icon = <FontAwesomeIcon icon={faDumbbell} className="text-3xl text-blue-500"/>
            break;
        case "Property Services":
            icon = <FontAwesomeIcon icon={faTruckFast} className="text-3xl text-blue-500"/>
            break;
        case "Apartment Highlights":
            icon = <FontAwesomeIcon icon={faWifi} className="text-3xl text-blue-500"/>
            break;
        case "Kitchen Features":
            icon = <FontAwesomeIcon icon={faKitchenSet} className="text-3xl text-blue-500"/>
            break;
        case "Floor Plan Features":
            icon = <FontAwesomeIcon icon={faRug} className="text-3xl text-blue-500"/>
            break;
        case "Utilities":
            icon = <FontAwesomeIcon icon={faLightbulb} className="text-3xl text-blue-500"/>
            break;
    }

    return (
        <div className="flex flex-col gap-4">
            <button className="flex flex-row gap-4 text-xl text-black-500 font-bold text-left rounded-xl px-4 bg-white shadow-standard py-2" onClick={()=>{setShow(!show)}}>
                <div className="my-auto">{icon}</div>
                <div className="my-auto">{section_header}</div>
                <FontAwesomeIcon icon={faChevronDown} className="my-auto ml-auto text-lg text-slate-600 hover:scale-125 duration-200" />
            </button>
        
            {show &&
                <ul id="dropdownId" className="grid grid-cols-3 gap-x-14 gap-y-2 text-left text-sm text-slate-600 pl-8 list-disc list-outside duration-200">
                    { features_list.map((feature, index) => {
                        return (
                            <li className="hover:scale-105 duration-300" key={index}>{feature}</li>
                        )
                    })}
                </ul>
            }
        </div>  
    );
};

export default FeatureListBox;