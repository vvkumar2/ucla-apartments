import { useState } from 'react';

/**
 *
 * @param placeholder: The default text to display on the dropdown button
 * @param options: An array of objects with the following structure: [{ value: "value", label: "label" }, ...]
 * @param currentLabel: The current value of the dropdown
 * @param onChange: A function that takes in the value and label of the selected option
 * @returns
 */
export default function SortByDropdown({ placeholder, currentLabel, options, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  function handleOptionClick(value, label) {
    onChange(value, label);
  }

  return (
    <div className="relative flex h-10 w-full flex-col items-center 1000:w-[250px]">
      <button
        className="inline-flex h-full w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5 text-center text-sm font-medium text-gray-600 hover:text-blue-700 focus:ring-blue-300 hover:focus:outline-none 1000:w-[250px]"
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-truncate">
          {currentLabel === null ? placeholder : 'Sort By: ' + currentLabel}{' '}
        </span>
        <svg
          className="ml-2 h-4 w-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute top-14 right-0 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option, index) => (
              <li
                value={option.value}
                key={index}
                onClick={() => handleOptionClick(option.value, option.label)}
              >
                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
