import React, { useState } from "react";

function BedsFilter() {
    return (
        <div className="w-full flex flex-col">
            <span className="text-sm text-gray-500">Beds</span>
            <div className="flex gap-3 w-full h-10 items-center">
                <input className="w-full h-full border rounded-md flex text-center" placeholder={"Min"} />
                <span className="text-gray-500">-</span>
                <input className="w-full h-full border rounded-md flex text-center" placeholder={"Max"} />
            </div>
        </div>
    );
}

function BathFilter() {
    return (
        <div className="w-full flex flex-col">
            <span className="text-sm text-gray-500">Baths</span>
            <div className="flex gap-3 w-full h-10 items-center">
                <input className="w-full h-full border rounded-md flex text-center" placeholder={"Min"} />
                <span className="text-gray-500">-</span>
                <input className="w-full h-full border rounded-md flex text-center" placeholder={"Max"} />
            </div>
        </div>
    );
}

function RentFilter() {
    return (
        <div className="w-full flex flex-col">
            <span className="text-sm text-gray-500">Rent</span>
            <div className="flex gap-3 w-full h-10 items-center">
                <input className="w-full h-full border rounded-md flex text-center" placeholder={"Min"} />
                <span className="text-gray-500">-</span>
                <input className="w-full h-full border rounded-md flex text-center" placeholder={"Max"} />
            </div>
        </div>
    );
}

/**
 *
 * @param placeholder: The default text to display on the dropdown button
 * @param options: An array of objects with the following structure: [{ value: "value", label: "label" }, ...]
 * @param currentLabel: The current value of the dropdown
 * @param onChange: A function that takes in the value and label of the selected option
 * @returns
 */
export default function FiltersDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="relative flex flex-col items-center h-full">
            <button
                className="text-blue-700 hover:text-blue-800 shadow-standard h-full bg-white  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                Filters{" "}
                <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {showDropdown && (
                <div className="absolute top-14 right-0 z-10 bg-white divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-[300px] p-5 flex flex-col gap-4">
                    <div className="flex justify-between border-b pb-1">
                        <span className="text-sm">Filters</span>
                        <span className="text-sm font-bold text-blue-700 cursor-pointer">Clear all</span>
                    </div>
                    <BedsFilter />
                    <BathFilter />
                    <RentFilter />
                    <button className="h-10 rounded-md bg-blue-700 hover:bg-blue-800 text-white">Apply Filters</button>
                </div>
            )}
        </div>
    );
}
