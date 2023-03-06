import React, { useState } from "react";

/**
 * @param filter_name - The name of the field being filtered
 */
export default function SingleFilterDropdown({ filter_name }) {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="relative flex flex-col items-center h-full">
            <button
                className="text-gray-700 hover:text-gray-800 h-full w-[200px] bg-gray-100 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span>{filter_name} </span>
                <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {showDropdown && (
                <div className="absolute top-14 right-0 z-10 bg-white divide-gray-100 rounded-lg shadow-standard dark:bg-gray-700 w-[200px] p-5 flex flex-col gap-4">
                    <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">{filter_name}</span>
                        <span className="text-sm font-bold text-blue-700 cursor-pointer">Clear all</span>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <input className="w-full h-10 border rounded-md flex text-center" placeholder={"Min"} />
                        <input className="w-full h-10 border rounded-md flex text-center" placeholder={"Max"} />
                    </div>
                    <button className="h-10 rounded-md bg-blue-700 hover:bg-blue-800 text-white">Apply Filter</button>
                </div>
            )}
        </div>
    );
}
