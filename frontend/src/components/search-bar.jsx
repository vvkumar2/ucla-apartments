export default function SearchBar({ searchFieldChangeHandler }) {
    return (
        <div className="flex items-center gap-2 w-full 1300:w-[250px] rounded-md text-gray-600 px-4 text-sm bg-gray-50 h-full">
            <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
                className="border-none outline-none focus:outline-none focus:ring-0 w-full bg-gray-50 text-sm font-medium"
                type="search"
                placeholder={`Search ${window.innerWidth > 1300 || window.innerWidth < 500 ? "" : "for any keyword"}`}
                onChange={searchFieldChangeHandler}
                id="search-box"
            />
        </div>
    );
}
