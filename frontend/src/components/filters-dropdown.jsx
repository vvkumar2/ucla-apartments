import React, { useState, useEffect } from "react";

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

function FiltersDropdownLargeScreen() {
    const [showBedsDropdown, setShowBedsDropdown] = useState(false);
    const [showBathsDropdown, setShowBathsDropdown] = useState(false);
    const [showRentDropdown, setShowRentDropdown] = useState(false);

    const filters = ["Beds", "Baths", "Rent"];

    function handleFilterDropdownClick(e) {
        switch (e.currentTarget.value) {
            case "Beds":
                setShowBedsDropdown(!showBedsDropdown);
                break;
            case "Baths":
                setShowBathsDropdown(!showBathsDropdown);
                break;
            case "Rent":
                setShowRentDropdown(!showRentDropdown);
                break;
            default:
                break;
        }
    }

    return (
        <div className="h-10 inline-flex items-center bg-gray-50 rounded-lg">
            {filters.map((filter, index) => {
                const showCurrentDropdown = filter === "Beds" ? showBedsDropdown : filter === "Baths" ? showBathsDropdown : showRentDropdown;
                return (
                    <>
                        {index > 0 && <span className="h-[50%] w-0 border-r border-gray-300" />}
                        <div className="relative">
                            <button
                                className="h-full w-[100px] xl:w-[130px] 2xl:w-[150px] focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center justify-between text-blue-700 hover:text-blue-700"
                                type="button"
                                onClick={handleFilterDropdownClick}
                                value={filter}
                            >
                                {filter}{" "}
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
                            {showCurrentDropdown && (
                                <div className="absolute top-14 right-0 z-10 dark:bg-gray-700 w-full p-5 flex rounded-lg bg-white border flex-col gap-4">
                                    <div className="flex justify-between border-b pb-1">
                                        <span className="text-sm">{filter}</span>
                                        <span className="text-sm font-bold text-blue-700 cursor-pointer">Clear all</span>
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                        <input className="w-full h-10 border rounded-md flex text-center" placeholder={"Min"} />
                                        <input className="w-full h-10 border rounded-md flex text-center" placeholder={"Max"} />
                                    </div>
                                    <button className="h-10 rounded-md bg-blue-700 hover:bg-blue-800 text-white">Apply</button>
                                </div>
                            )}
                        </div>
                    </>
                );
            })}
        </div>
    );
}

function FiltersDropdownSmallScreen() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="h-10 relative flex flex-col items-center w-full 1000:w-auto">
            <button
                className="bg-gray-50 rounded-lg w-full 1000:w-[250px] h-full focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center justify-between text-gray-600"
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
                <div className="absolute top-14 right-0 z-10 bg-white shadow-standard w-[300px] p-5 flex rounded-lg flex-col gap-4">
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

export default function FiltersDropdown() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        return window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        });
    }, []);

    return screenWidth > 1050 ? <FiltersDropdownLargeScreen /> : <FiltersDropdownSmallScreen />;
}
