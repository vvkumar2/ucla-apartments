import { useEffect, useState, useRef } from 'react';

function BedsFilter({ minBedFieldChangeHandler, maxBedFieldChangeHandler, minBedField, maxBedField }) {
  minBedField = 
    isNaN(minBedField) 
    ? null 
    : minBedField;
  maxBedField = 
    isNaN(maxBedField) 
    ? null 
    : maxBedField;
  return (
    <div className="flex w-full flex-col">
      <span className="text-sm text-gray-500">Beds</span>
      <div className="flex h-10 w-full items-center gap-3">
        <input className="flex h-full w-full rounded-md border text-center" placeholder={'Min'} onChange={minBedFieldChangeHandler} value={minBedField} />
        <span className="text-gray-500">-</span>
        <input className="flex h-full w-full rounded-md border text-center" placeholder={'Max'} onChange={maxBedFieldChangeHandler} value={maxBedField} />
      </div>
    </div>
  );
}

function BathFilter({ minBathFieldChangeHandler, maxBathFieldChangeHandler, minBathField, maxBathField }) {
  minBathField = 
    isNaN(minBathField) 
    ? null 
    : minBathField;
  maxBathField = 
    isNaN(maxBathField) 
    ? null 
    : maxBathField;
  return (
    <div className="flex w-full flex-col">
      <span className="text-sm text-gray-500">Baths</span>
      <div className="flex h-10 w-full items-center gap-3">
        <input className="flex h-full w-full rounded-md border text-center" placeholder={'Min'} onChange={minBathFieldChangeHandler} value={minBathField} />
        <span className="text-gray-500">-</span>
        <input className="flex h-full w-full rounded-md border text-center" placeholder={'Max'} onChange={maxBathFieldChangeHandler} value={maxBathField} />
      </div>
    </div>
  );
}

function RentFilter({ minRentFieldChangeHandler, maxRentFieldChangeHandler, minRentField, maxRentField }) {
  minRentField = 
    isNaN(minRentField) 
    ? null 
    : minRentField;
  maxRentField = 
    isNaN(maxRentField) 
    ? null 
    : maxRentField;
  return (
    <div className="flex w-full flex-col">
      <span className="text-sm text-gray-500">Rent</span>
      <div className="flex h-10 w-full items-center gap-3">
        <input className="flex h-full w-full rounded-md border text-center" placeholder={'Min'} onChange={minRentFieldChangeHandler} value={minRentField} />
        <span className="text-gray-500">-</span>
        <input className="flex h-full w-full rounded-md border text-center" placeholder={'Max'} onChange={maxRentFieldChangeHandler} value={maxRentField} />
      </div>
    </div>
  );
}

function FiltersDropdownLargeScreen({ minBedFieldChangeHandler, maxBedFieldChangeHandler, minBathFieldChangeHandler, maxBathFieldChangeHandler, minRentFieldChangeHandler, maxRentFieldChangeHandler, resetBaths, resetBeds, resetRent, minBathField, maxBathField, minBedField, maxBedField, minRentField, maxRentField }) {
  const [showBedsDropdown, setShowBedsDropdown] = useState(false);
  const [showBathsDropdown, setShowBathsDropdown] = useState(false);
  const [showRentDropdown, setShowRentDropdown] = useState(false);

  const filters = ['Beds', 'Baths', 'Rent'];
  const catMenu = useRef(null)

  const closeOpenMenus = (e) => {
    if(catMenu.current && (showBathsDropdown || showBedsDropdown || showRentDropdown) && !catMenu.current.contains(e.target)){
      setShowBedsDropdown(false)
      setShowBathsDropdown(false)
      setShowRentDropdown(false)
    }
  }
  document.addEventListener('mousedown',closeOpenMenus)


  function handleFilterDropdownClick(e) {
    switch (e.currentTarget.value) {
      case 'Beds':
        setShowBedsDropdown(!showBedsDropdown);
        break;
      case 'Baths':
        setShowBathsDropdown(!showBathsDropdown);
        break;
      case 'Rent':
        setShowRentDropdown(!showRentDropdown);
        break;
      default:
        break;
    }
  }

  return (
    <div className="inline-flex h-10 items-center rounded-lg bg-gray-50">
      {filters.map((filter, index) => {
        const showCurrentDropdown =
          filter === 'Beds'
            ? showBedsDropdown
            : filter === 'Baths'
            ? showBathsDropdown
            : showRentDropdown;

        let minimum = 
          filter === 'Beds' 
          ? minBedField 
          : filter === 'Baths' 
          ? minBathField 
          : minRentField;
        minimum = 
          isNaN(minimum) 
          ? null 
          : minimum
        let maximum = 
          filter === 'Beds' 
          ? maxBedField 
          : filter === 'Baths' 
          ? maxBathField 
          : maxRentField;
        maximum = 
          isNaN(maximum) 
          ? null 
          : maximum;
        
        return (
          <>
            {index > 0 && (
              <span
                className="h-[50%] w-0 border-r border-gray-300"
                key={`dropdown_span_${index}`}
              />
            )}
            <div className="relative" key={`dropdown_div_${index}`}>
              <button
                ref={catMenu}
                className="inline-flex h-full w-[100px] items-center justify-between px-4 py-2.5 text-center text-sm font-medium text-blue-700 hover:text-blue-700 focus:outline-none focus:ring-blue-300 xl:w-[130px] 2xl:w-[150px]"
                type="button"
                onClick={handleFilterDropdownClick}
                value={filter}
              >
                {filter}{' '}
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
              {showCurrentDropdown && (
                <div ref={catMenu} className="absolute top-14 right-0 z-10 flex w-full flex-col gap-4 rounded-lg border bg-white p-5 dark:bg-gray-700">
                  <div className="flex flex-col justify-between border-b pb-1">
                    <span className="text-sm">{filter}</span>
                    <span className="cursor-pointer text-sm font-bold text-blue-700" onClick={filter === 'Beds' ? resetBeds : filter === 'Baths' ? resetBaths : resetRent}>
                      Clear
                    </span>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-center"
                      placeholder={'Min'}
                      value={minimum}
                      onChange={filter === 'Beds' ? minBedFieldChangeHandler : filter === 'Baths' ? minBathFieldChangeHandler : minRentFieldChangeHandler}
                    />
                    <input
                      className="flex h-10 w-full rounded-md border text-center"
                      placeholder={'Max'}
                      value={maximum}
                      onChange={filter === 'Beds' ? maxBedFieldChangeHandler : filter === 'Baths' ? maxBathFieldChangeHandler : maxRentFieldChangeHandler}
                    />
                  </div>
                  {/* <button className="h-10 rounded-md bg-blue-700 text-white hover:bg-blue-800">
                    Apply
                  </button> */}
                </div>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
}

function FiltersDropdownSmallScreen({ minBedFieldChangeHandler, maxBedFieldChangeHandler, minBathFieldChangeHandler, maxBathFieldChangeHandler, minRentFieldChangeHandler, maxRentFieldChangeHandler, resetBaths, resetBeds, resetRent, minBathField, maxBathField, minBedField, maxBedField, minRentField, maxRentField }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const catMenu = useRef(null)

  const closeOpenMenus = (e) => {
    if(catMenu.current && showDropdown && !catMenu.current.contains(e.target)){
      setShowDropdown(false)
    }
  }
  document.addEventListener('mousedown',closeOpenMenus)

  return (
    <div className="relative flex h-10 w-full flex-col items-center 1000:w-auto">
      <button
      ref={catMenu}
        className="inline-flex h-full w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5 text-center text-sm font-medium text-gray-600 focus:outline-none focus:ring-blue-300 1000:w-[250px]"
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Filters{' '}
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
        <div ref={catMenu} className="absolute top-14 right-0 z-10 flex w-[300px] flex-col gap-4 rounded-lg bg-white p-5 shadow-standard">
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Filters</span>
          </div>
          <BedsFilter 
            minBedFieldChangeHandler={minBedFieldChangeHandler}
            maxBedFieldChangeHandler={maxBedFieldChangeHandler}
            minBedField={minBedField}
            maxBedField={maxBedField}
          />
          <BathFilter 
            minBathFieldChangeHandler={minBathFieldChangeHandler}
            maxBathFieldChangeHandler={maxBathFieldChangeHandler}
            minBathField={minBathField}
            maxBathField={maxBathField}
          />
          <RentFilter 
            minRentFieldChangeHandler={minRentFieldChangeHandler}
            maxRentFieldChangeHandler={maxRentFieldChangeHandler}
            minRentField={minRentField}
            maxRentField={maxRentField}
          />
          {/* <button className="h-10 rounded-md bg-blue-700 text-white hover:bg-blue-800">
            Apply Filters
          </button> */}
        </div>
      )}
    </div>
  );
}

export default function FiltersDropdown({ minBedFieldChangeHandler, maxBedFieldChangeHandler, minBathFieldChangeHandler, maxBathFieldChangeHandler, minRentFieldChangeHandler, maxRentFieldChangeHandler, minBathField, maxBathField, minBedField, maxBedField, minRentField, maxRentField, resetBaths, resetBeds, resetRent }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    return window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return screenWidth > 1050 ? 
  <FiltersDropdownLargeScreen 
    minBedFieldChangeHandler={minBedFieldChangeHandler}
    maxBedFieldChangeHandler={maxBedFieldChangeHandler}
    minBathFieldChangeHandler={minBathFieldChangeHandler}
    maxBathFieldChangeHandler={maxBathFieldChangeHandler}
    minRentFieldChangeHandler={minRentFieldChangeHandler}
    maxRentFieldChangeHandler={maxRentFieldChangeHandler}
    minBathField={minBathField}
    maxBathField={maxBathField}
    minBedField={minBedField}
    maxBedField={maxBedField}
    minRentField={minRentField}
    maxRentField={maxRentField}
    resetBaths={resetBaths}
    resetBeds={resetBeds}
    resetRent={resetRent}
/> 
  : 
  <FiltersDropdownSmallScreen 
    minBedFieldChangeHandler={minBedFieldChangeHandler}
    maxBedFieldChangeHandler={maxBedFieldChangeHandler}
    minBathFieldChangeHandler={minBathFieldChangeHandler}
    maxBathFieldChangeHandler={maxBathFieldChangeHandler}
    minRentFieldChangeHandler={minRentFieldChangeHandler}
    maxRentFieldChangeHandler={maxRentFieldChangeHandler}
    minBathField={minBathField}
    maxBathField={maxBathField}
    minBedField={minBedField}
    maxBedField={maxBedField}
    minRentField={minRentField}
    maxRentField={maxRentField}
    resetBaths={resetBaths}
    resetBeds={resetBeds}
    resetRent={resetRent}
  />;
}
