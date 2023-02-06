import React, { useState } from "react";

/**
 *
 * @param placeholder: The default text to display on the dropdown button
 * @param options: An array of objects with the following structure: [{ value: "value", label: "label" }, ...]
 * @param currentLabel: The current value of the dropdown
 * @param onChange: A function that takes in the value and label of the selected option
 * @returns
 */
export default function Dropdown({ placeholder, currentLabel, options, onChange }) {
    const [showDropdown, setShowDropdown] = useState(false);

    function handleOptionClick(value, label) {
        onChange(value, label);
    }

    return (
        <div className="relative flex flex-col items-center h-full">
            <button
                className="h-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {currentLabel === null ? placeholder : "Sort By: " + currentLabel}{" "}
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
                <div className="absolute top-14 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {options.map((option, index) => (
                            <li value={option.value} key={index} onClick={() => handleOptionClick(option.value, option.label)}>
                                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{option.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
