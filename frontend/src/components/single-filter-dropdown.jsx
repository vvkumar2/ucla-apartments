import { useState } from 'react';

/**
 * @param filter_name - The name of the field being filtered
 */
export default function SingleFilterDropdown({ filter_name }) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative flex h-full flex-col items-center">
      <button
        className="inline-flex h-full w-[200px] items-center justify-between bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-blue-300"
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{filter_name} </span>
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
        <div className="absolute top-14 right-0 z-10 flex w-[200px] flex-col gap-4 divide-gray-100 rounded-lg bg-white p-5 shadow-standard dark:bg-gray-700">
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">{filter_name}</span>
            <span className="cursor-pointer text-sm font-bold text-blue-700">Clear all</span>
          </div>
          <div className="flex w-full flex-col gap-3">
            <input className="flex h-10 w-full rounded-md border text-center" placeholder={'Min'} />
            <input className="flex h-10 w-full rounded-md border text-center" placeholder={'Max'} />
          </div>
          <button className="h-10 rounded-md bg-blue-700 text-white hover:bg-blue-800">
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
}
