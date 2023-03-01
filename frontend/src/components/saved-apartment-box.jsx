import React from "react";
import { Link } from "react-router-dom";
import useUserContext from "../context/user.context";
import { addItemToSupabaseCategory } from "../utils/supabase-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";



export default function SavedApartmentBox({ apartment, category, tooltip=false }) {
    const { address, image_url, name, rent, sqft, beds, baths, id } = apartment;
    const { email } = useUserContext();
    // remove city and zip code for address
    const abbreviatedAddress = address.indexOf("Los Angeles") > 10 ? address.substring(0, address.indexOf("Los Angeles")) : address;

    async function handleDropdownChange(e) {
        if (e.target.value ==="") return;
        await addItemToSupabaseCategory(email, e.target.value, apartment, category);
        window.location.reload();
    }

    async function handleRemoveClick() {
        await addItemToSupabaseCategory(email, category, apartment, category);
        window.location.reload();
    }


    return (
        <div className="flex flex-col w-full w-80 bg-white shadow-standard rounded-lg h-min">
            <div className="h-[175px] w-full rounded-t-lg relative items-center justify-center overflow-hidden">
                <img className="object-cover min-h-full min-w-full w-auto" src={image_url} alt="" />
                { !tooltip &&
                    <div className="absolute top-0 right-0 p-1">
                        <FontAwesomeIcon onClick={handleRemoveClick} icon={faX} className="w-1/3 backdrop-blur-sm bg-white/80 shadow-standard text-gray-700 font-semibold text-xs py-1 px-2 rounded hover:bg-gray-100 cursor-pointer" />
                    </div>
                }
                { !tooltip &&
                    <select onChange={handleDropdownChange} name="cars" id="cars" className="absolute right-0 bottom-0 w-1/2 sm:w-1/3 backdrop-blur-sm bg-white/80 shadow-standard text-gray-700 font-semibold text-xs py-2 px-4 rounded hover:bg-gray-100 border-none m-1">
                        <option value="Move to" selected hidden disabled>
                            Move to
                        </option>
                        {category === "SAVED_FOR_LATER" && <option value="">Liked</option>}
                        {category === "CONTACTING_OWNER" && <option value="">Contacting Owner</option>}
                        {category === "APPLICATIONS_IN_PROGRESS" && <option value="">Application in Progress</option>}
                        {category === "COMPLETED" && <option value="">Completed</option>}

                        {category !== "SAVED_FOR_LATER" && <option value="SAVED_FOR_LATER">Liked</option>}
                        {category !== "CONTACTING_OWNER" && <option value="CONTACTING_OWNER">Contacting Owner</option>}
                        {category !== "APPLICATIONS_IN_PROGRESS" && <option value="APPLICATIONS_IN_PROGRESS">Application in Progress</option>}
                        {category !== "COMPLETED" && <option value="COMPLETED">Completed</option>}
                    </select>
                }
            </div>
            <div className="w-full py-3 px-8 flex flex-col gap-1">
                <div className="flex flex-col">
                    <Link to={`/apartment-listing?id=${id}`} className="text-lg font-bold tracking-wide text-ellipsis hover:text-blue-700 cursor-pointer">{name}</Link>
                    <div className="flex items-center gap-1 overflow-hidden">
                        <span className="text-truncate text-sm text-blue-700 font-bold py-1">{rent}<p className="float-right ">/month</p></span>
                    </div>
                </div>
                <hr />
                <div className="apartment-card-details-layout text-gray-500 text-sm">
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-500 text-truncate" >Sqft</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{sqft}</span>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-500 text-truncate">Beds</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{beds}</span>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm text-gray-500 text-truncate">Baths</span>
                        <div className="flex items-center gap-1 overflow-hidden">
                            <span className="text-truncate text-md text-blue-700 font-bold">{baths}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
