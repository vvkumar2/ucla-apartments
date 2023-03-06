import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HeartIcon } from "../assets/heart-icon.svg";
import useUserContext from "../context/user.context";
import { checkIfItemInSupabaseCategory, addItemToSupabaseCategory } from "../utils/supabase-utils";

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
        <div className="flex flex-col w-full md:w-[calc((100%-40px)/2)] xl:w-[calc((100%-80px)/3)] bg-white shadow-standard rounded-lg">
            <div className="h-[200px] w-full rounded-t-lg flex items-center justify-center overflow-hidden">
                <img className="object-cover min-h-full min-w-full w-auto" src={image_url} alt="" />
            </div>
            <div className="w-full py-5 px-8 flex flex-col gap-4">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold tracking-wide text-truncate hover:text-blue-800 cursor-pointer">
                        <Link to={"/apartment-listing?id=" + String(id)}>{name}</Link>
                    </h1>
                    {rent.toLowerCase() !== "call for rent" ? (
                        <div className="flex items-center">
                            <span className="text-truncate text-md text-blue-700 font-bold">{rent}</span>
                            <span className="text-truncate text-sm text-gray-500">/month</span>
                        </div>
                    ) : (
                        <span className="text-truncate text-sm text-gray-500">Call for rent</span>
                    )}
                </div>
                <hr />
                <span className="text-sm text-gray-500 text-truncate">{address}</span>
                <hr />
                <div className="apartment-card-details-layout text-gray-500 text-sm">
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-400 text-truncate">Beds</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{beds}</span>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-400 text-truncate">Baths</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{baths}</span>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-400 text-truncate">Square feet</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{sqft}</span>
                        </div>
                    </div>
                    {/* <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-400 text-truncate">Rent</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{rent}</span>
                        </div>
                    </div> */}
                </div>
                <hr />
                <div className="flex justify-between items-center h-6">
                    <HeartIcon
                        className={`cursor-pointer  ${liked ? "fill-red-500 hover:fill-red-700" : " stroke-red-500 fill-none hover:fill-red-500"}`}
                        onClick={() => addToLiked(apartment)}
                    />
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faPersonWalking} className="text-gray-500 h-4" />
                        <span className="text-sm">{distance} mi to UCLA</span>
                    </div>
                </div>
            </div>
            {/* <div className="apartment-box-description">
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
            </div> */}
        </div>
    );
};

export default ApartmentBox;
