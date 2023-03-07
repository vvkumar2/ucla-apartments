export default function SearchBar({ searchFieldChangeHandler }) {
  return (
    <div className="flex h-full w-full items-center gap-2 rounded-md bg-gray-50 px-4 text-sm text-gray-600 1300:w-[250px]">
      <svg
        aria-hidden="true"
        className="h-5 w-5 text-gray-500 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <input
        className="w-full border-none bg-gray-50 text-sm font-medium outline-none focus:outline-none focus:ring-0"
        type="search"
        placeholder={`Search ${
          window.innerWidth > 1300 || window.innerWidth < 500 ? '' : 'for any keyword'
        }`}
        onChange={searchFieldChangeHandler}
        id="search-box"
      />
    </div>
  );
}
