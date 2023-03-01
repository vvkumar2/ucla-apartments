import React from "react";

export default function MapsApartmentBox({ address, image_url, name, rent, sqft, id }) {
    const beds = 3;
    const baths = 2;
    // const { address, image_url, name, rent, sqft, id } = apartment;
    // remove city and zip code for address
    const abbreviatedAddress = address.indexOf("Los Angeles") > 10 ? address.substring(0, address.indexOf("Los Angeles")) : address;

    return (
        <div className="h-[300px] w-min-[300px] rounded-lg border-2 border-slate-100 flex flex-col">
            <div className="w-full h-[200px] relative overflow-hidden">
                <img className="w-full rounded-md overflow-hidden object-cover" src={image_url} alt="Apartment" />
            </div>
            <div className="w-full py-2 px-4 flex flex-col gap-1">
                <div className="flex flex-col">
                    <a href={`/apartment-listing?id=${id}`} className="text-lg leading-5 font-bold tracking-wide text-ellipsis hover:underline cursor-pointer">{name}</a>
                    <div className="flex items-center gap-1 overflow-hidden">
                        { rent!=="Call for Rent" && <span className="text-truncate text-sm text-blue-700 font-bold py-1">{rent}<p className="float-right ">/month</p></span> }
                        { rent==="Call for Rent" && <span className="text-truncate text-sm text-blue-700 font-bold py-1">{rent}</span> }
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
